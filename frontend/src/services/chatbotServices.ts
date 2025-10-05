import { api } from "./api"; // 👈 usa tu cliente axios

export interface ChatbotResponse {
  response: string;
}

export const sendMessageToChatbot = async (userMessage: string): Promise<string> => {
  try {
    const res = await api.post<ChatbotResponse>(
      "/chatbot/api/v1/conversation/", // 👈 ruta completa del endpoint Django
      { user_message: userMessage }
    );

    return res.data.response;
  } catch (error: any) {
    if (error.response) {
      console.error("Chatbot API error:", error.response.data);
      throw new Error(
        error.response.data.error ||
        error.response.data.detail ||
        "Error en la respuesta del servidor"
      );
    }
    console.error("Network/Unknown error:", error);
    throw new Error("Error de red o servidor no disponible");
  }
};