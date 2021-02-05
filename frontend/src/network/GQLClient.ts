import { GQLRootResTypes } from "@baseTypes/database/GQLResTypes";
import { request } from "graphql-request";

const fetch = async (query: string) => {
  // console.log(query);
  return await request("http://localhost:3001/graphql", query);
};

export const rootQuery = async (query: string): Promise<GQLRootResTypes> => {
  return fetch(query);
};
