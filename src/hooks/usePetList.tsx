import { useQuery } from "@tanstack/react-query";
import { GetPetsRequest, GetPetsResponse } from "../interfaces/pet";
import { getPets } from "../services/pets/getPets";

interface IUsePetList  {
  data?: GetPetsResponse;
  isLoading: boolean;
}
/* interface IUsePetList{
    data?:GetPetsResponse
    isLoading:boolean
} */
export const usePetList = (params: GetPetsRequest): IUsePetList => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["get-pets", params],
    queryFn: () => getPets(params),
    staleTime: 1 * 60 * 1000,
  });
  return { data, isLoading };
};
