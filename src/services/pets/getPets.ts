import { GetPetsRequest, GetPetsResponse } from "../../interfaces/pet";
import httpClient from "../api/httpClient";

export const getPets = async (params:GetPetsRequest):Promise<GetPetsResponse> => {
  try {
    const response = await httpClient.get(`/pet`,{params});
    return response.data
  } catch (error) {
    throw error
  }
};
