import { GQLRootResTypes } from "@baseTypes/database/GQLResTypes";
import { request } from "graphql-request";

const fetch = async (query: string) => {
  return await request("http://localhost:3001/graphql", query);
};

export const rootQuery = async (query: string): Promise<GQLRootResTypes> => {
  console.log(query);

  return fetch(query);
};
