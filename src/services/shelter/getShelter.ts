import { IShelter } from "../../interfaces/shelter";
import httpClient from "../api/httpClient";

export const getShelter = async ():Promise<IShelter> => {
  try {
    const response = await httpClient.get(`/shelter`);
    return response.data
  } catch (error) {
    console.error("Erro ao buscar abrigo", error)
    throw error
  }
};
