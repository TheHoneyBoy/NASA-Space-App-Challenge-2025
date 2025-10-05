# =====================================
# training.py — versión mejorada (solo Stacking)
# =====================================

import joblib
import pandas as pd
import matplotlib.pyplot as plt
# import seaborn as sns
import numpy as np
import warnings

warnings.filterwarnings("ignore")

from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score, 
    recall_score, 
    f1_score, 
    confusion_matrix, 
    classification_report,
    roc_curve,
    auc
)
from sklearn.preprocessing import label_binarize
from sklearn.metrics import RocCurveDisplay


# =====================
# preprocessing.py
# =====================
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline


# ============
# 1️⃣ Load Data
# ============
def load_data(path):
    """Carga dataset tabular K2"""
    df = pd.read_csv(path, sep=",")
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    return df


# =========================
# 2️⃣ Preprocesamiento total
# =========================
def build_preprocessor(df, target="disposition"):
    """Crea preprocesador sklearn con limpieza, imputación y feature engineering"""

    # --- Eliminar columnas no predictivas ---
    drop_cols = [
        "rowid", "pl_name", "hostname", "epic_hostname", "epic_candname",
        "tic_id", "gaia_id", "disp_refname", "disc_refname", "pl_refname",
        "st_refname", "sy_refname", "k2_name", "hd_name", "hip_name"
    ]
    df = df.drop(columns=[c for c in drop_cols if c in df.columns], errors="ignore")

    # --- Eliminar columnas con >95% de missing ---
    missing_ratio = df.isnull().mean()
    high_missing = missing_ratio[missing_ratio > 0.95].index
    df = df.drop(columns=high_missing, errors="ignore")

    # --- Separar X, y ---
    X = df.drop(columns=[target])
    y = df[target]

    # --- Feature Engineering ---
    # Planetas por estrella
    if {"sy_pnum", "sy_snum"}.issubset(X.columns):
        X["planets_per_star"] = X["sy_pnum"] / X["sy_snum"].replace(0, np.nan)
    # Lunas por planeta
    if {"sy_mnum", "sy_pnum"}.issubset(X.columns):
        X["moons_per_planet"] = X["sy_mnum"] / X["sy_pnum"].replace(0, np.nan)
    # Antigüedad
    if "disc_year" in X.columns:
        X["discovery_age"] = 2025 - X["disc_year"]
    # Nivel de observación
    obs_cols = [c for c in X.columns if c.startswith(("st_nphot", "st_nrvc", "pl_ntranspec"))]
    if len(obs_cols) > 0:
        X["well_observed"] = (X[obs_cols].sum(axis=1) > 0).astype(int)
    # Espacial / terrestre
    if "disc_locale" in X.columns:
        X["space_based"] = X["disc_locale"].apply(lambda x: 1 if isinstance(x, str) and "space" in x.lower() else 0)

    # --- Identificar tipos ---
    num_cols = X.select_dtypes(include=["int64", "float64"]).columns
    cat_cols = X.select_dtypes(include=["object", "category"]).columns

    # --- Pipelines ---
    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="constant", fill_value="Unknown")),
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, num_cols),
            ("cat", categorical_transformer, cat_cols)
        ]
    )

    return X, y, preprocessor


# ============================================
# 3️⃣ Entrenamiento, evaluación y guardado
# ============================================
def train_and_select_model(path="k2_data.csv", target="disposition"):
    """Entrena solo el modelo Stacking con preprocesamiento avanzado"""
    data_response = {}

    # 1. Cargar data
    df = load_data(path)
    # print("Available columns:", df.columns.tolist())

    X, y, preprocessor = build_preprocessor(df, target)

    # 2. Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 3. Definir solo modelo Stacking
    stacking_model = StackingClassifier(
        estimators=[
            ("rf", RandomForestClassifier(n_estimators=100, random_state=42)),
            ("ada", AdaBoostClassifier(n_estimators=100, random_state=42)),
        ],
        final_estimator=LogisticRegression(max_iter=500),
        passthrough=True,
        n_jobs=-1
    )

    # 4. Pipeline y Cross-validation
    pipe = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("model", stacking_model)
    ])
    scores = cross_val_score(pipe, X_train, y_train, cv=5, scoring="accuracy")
    print(f"\nStacking: {scores.mean():.4f} (+/- {scores.std():.4f})")

    # 5. Entrenar final
    pipe.fit(X_train, y_train)

    # 6. Guardar modelo
    joblib.dump(pipe, "best_model.pkl")
    print("📦 Modelo guardado como 'best_model.pkl'")

    # 7. Evaluar
    y_pred = pipe.predict(X_test)
    print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

    # === Matriz de confusión ===
    cm = confusion_matrix(y_test, y_pred)
    data_response['confusion_matrix'] = cm.tolist()
    
    """ plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=pipe.classes_,
                yticklabels=pipe.classes_)
    plt.xlabel("Predicción")
    plt.ylabel("Real")
    plt.title("Matriz de confusión")
    plt.savefig("confusion_matrix.png", dpi=300)
    plt.close() """

    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='macro')
    recall = recall_score(y_test, y_pred, average='macro')
    f1 = f1_score(y_test, y_pred, average='macro')
    
    y_prob = pipe.predict_proba(X_test)

    data_response["accuracy"] = accuracy
    data_response["precision"] = precision
    data_response["recall"] = recall
    data_response["f1_score"] = f1

    # === Curva ROC Multiclase ===
    try:
        classes = pipe.classes_
        y_test_bin = label_binarize(y_test, classes=classes)
        y_score = pipe.predict_proba(X_test)
        fpr, tpr, roc_auc = dict(), dict(), dict()
        roc_auc_data = {}
        for i, c in enumerate(classes):
            fpr[i], tpr[i], _ = roc_curve(y_test_bin[:, i], y_score[:, i])
            roc_auc[i] = auc(fpr[i], tpr[i])
            roc_auc_data[f"roc_auc_class_{c}"] = roc_auc[i]
        data_response["auc"] = roc_auc_data

        """ plt.figure(figsize=(7, 6))
        for i, c in enumerate(classes):
            plt.plot(fpr[i], tpr[i], label=f"{c} (AUC = {roc_auc[i]:.2f})")
        plt.plot([0, 1], [0, 1], "k--")
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.title("Curva ROC Multiclase (OvR)")
        plt.legend(loc="lower right")
        plt.savefig("roc_curve.png", dpi=300)
        plt.close()
        print("📈 Curva ROC guardada en 'roc_curve.png'") """
    except Exception as e:
        print("⚠️ No se pudo generar la curva ROC:", e)

    # === Predicciones ===
    pred_df = pd.DataFrame({"Real": y_test, "Predicho": y_pred})
    pred_df.to_csv("predicciones.csv", index=False)
    print("📂 Predicciones guardadas en 'predicciones.csv'")

    return data_response

def hello():
    print("Hello, World!")
# if __name__ == "__main__":
#     train_and_select_model()
