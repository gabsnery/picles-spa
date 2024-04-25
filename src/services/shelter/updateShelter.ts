import { IUpdateShelterRequest, IUpdateShelterResponse } from "../../interfaces/shelter";
import httpClient from "../api/httpClient";

export const updateShelter = async (params:IUpdateShelterRequest):Promise<IUpdateShelterRequest> => {
  try {
    const response = await httpClient.put<IUpdateShelterResponse>(`/shelter`,params);
    return response.data
  } catch (error) {
    console.error("Erro ao atualizar abrigo", error)
    throw error
  }
};
