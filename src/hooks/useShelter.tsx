import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
import { getShelter } from "../services/shelter/getShelter";
import { IShelter } from "../interfaces/shelter";

/* interface IUsePetList{
    data?:GetPetsResponse
    isLoading:boolean
} */
export const useShelter = (options?:Partial<UseQueryOptions<IShelter,Error>>): UseQueryResult<IShelter,Error> => {
  const result= useQuery({
    ...options,
    queryKey: ["get-shelter"],
    queryFn: () => getShelter(),
    staleTime:Infinity
  });
  return result;
};
