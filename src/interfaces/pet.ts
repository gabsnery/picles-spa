export interface IPet {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  photo: string;
  bio: string;
}

export type GetPetsRequest = Partial<Pick<IPet, "type" | "size" | "gender">> & {
  page?: number;
  itemsPetPage?: number;
};

export type GetPetsResponse = {
  items: IPet[]
  totalPage:number
  currentPage:number
};

