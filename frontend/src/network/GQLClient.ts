import { request } from "graphql-request";

export const database = async (query: string) => {
  return await request("http://localhost:3001/graphql", query);
};
