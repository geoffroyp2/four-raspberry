import { request } from "graphql-request";

const fetch = async (query: string) => {
  console.log(query);
  return await request("http://localhost:3001/graphql", query);
};

export const sendGQLQuery = async <T>(query: string): Promise<T> => {
  return fetch(query);
};
