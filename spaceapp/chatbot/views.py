from django import template
from django.shortcuts import render
from .serializer import ChatbotMessageSerializer
from django.utils.decorators import method_decorator
from rest_framework import viewsets, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from rest_framework.response import Response

# chatbot imports - using PyPDFLoader to avoid dependency issues
from langchain_community.document_loaders import PyPDFLoader
from langchain.chat_models import init_chat_model
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever
from rest_framework.permissions import AllowAny

from dotenv import load_dotenv
import os

load_dotenv()
api_key_llm = os.getenv("API_KEY_OPEN_ROUTER")
base_url_llm = os.getenv("BASE_URL_OPEN_ROUTER")
os.environ["PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION"] = "python"

# Create your views here.
# @method_decorator(csrf_exempt, name='dispatch')
class ChatbotViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    serializer_class = ChatbotMessageSerializer  # Fixed: changed from serializer to serializer_class

    @action(detail=False, methods=['post'])
    def conversation(self, request):
        try:
            serializer = ChatbotMessageSerializer(data=request.data)
            
            # Configuration
            persist_directory = 'chatbot/vectorStore/chromadb'
            embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-mpnet-base-v2"
            )
            
            # Check if vector database exists, otherwise create it
            if not os.path.exists(persist_directory) or not os.listdir(persist_directory):
                # PDF reader - Using PyPDFLoader instead of UnstructuredPDFLoader
                # Build correct path to the PDF file (in the same directory as views.py)
                current_dir = os.path.dirname(os.path.abspath(__file__))
                pdf_path = os.path.join(current_dir, 'documentation', 'manual.pdf')
                
                # Check if PDF file exists
                if not os.path.exists(pdf_path):
                    return Response({
                        "error": f"PDF file not found", 
                        "searched_path": pdf_path,
                        "current_directory": current_dir,
                        "documentation_folder": os.path.join(current_dir, 'documentation')
                    }, status=status.HTTP_404_NOT_FOUND)
                
                print(f"Loading PDF from: {pdf_path}")
                loader = PyPDFLoader(pdf_path)
                data = loader.load()
                
                # Text splitter
                text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
                chunks = text_splitter.split_documents(data)
                
                # Create and persist vector database
                vector_db = Chroma.from_documents(
                    documents=chunks,
                    embedding=embeddings,
                    persist_directory=persist_directory,
                    collection_name="local-rag"
                )
                vector_db.persist()
                print(f"Vector database created with {len(chunks)} chunks.")
            else:
                # Load existing vector database
                vector_db = Chroma(
                    persist_directory=persist_directory,
                    embedding_function=embeddings,
                    collection_name="local-rag"
                )
                print("Existing vector database loaded.")
            
            # LLM
            llm = init_chat_model(
                model='gpt-4o-mini',
                api_key=api_key_llm,
                base_url=base_url_llm,
            )
            
            # Prompts
            QUERY_PROMPT = PromptTemplate(
                input_variables=["question"],
                template="""You are a support language model. Your task is to 
                provide step-by-step guidance based on the questions asked by a user, 
                using relevant documents from a vectorized database. Your goal is to 
                offer these steps and serve as a guide for the user.: {question}"""
            )
            
            template = """Answer the question based ONLY on the context below.:
            {context}
            Question: {question}
            """
            
            prompt = ChatPromptTemplate.from_template(template)
            
            # Retriever
            retriever = MultiQueryRetriever.from_llm(
                vector_db.as_retriever(),
                llm=llm,
                prompt=QUERY_PROMPT
            )
            
            # Chain
            chain = (
                {"context": retriever, "question": RunnablePassthrough()}
                | prompt
                | llm
                | StrOutputParser()
            )
            
            def chat(question, chain):
                return chain.invoke(question)
            
            if serializer.is_valid():
                user_message = serializer.validated_data['user_message']
                response_text = chat(user_message, chain)
                return Response({"response": response_text}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"Error Answering": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)