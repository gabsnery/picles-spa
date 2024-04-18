export interface IPet {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  photo: string;
  bio: string;
  /*     createdAt: Date;
    updatedAt: Date; */
}

export type GetPetsRequest = Partial<Pick<IPet, "type" | "size" | "gender">> & {
  page?: number;
  itemsPetPage?: number;
};

export type GetPetsResponse = {
  items: IPet[]
  totalPages:number
  currentPage:number
};

