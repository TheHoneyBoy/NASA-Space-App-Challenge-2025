import { api } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: {
    idUser: number;
    userName: string;
    email: string;
  };
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
const response = await api.post('user/api/v1/user/login/', data);
    return response.data;
};