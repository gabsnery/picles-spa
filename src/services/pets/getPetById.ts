import { IPet } from "../../interfaces/pet";
import httpClient from "../api/httpClient";

export const getPetById = async (id: string): Promise<IPet> => {
  try {
    const response = await httpClient.get(`/pet/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pet: ", error);
    throw error;
  }
};
1