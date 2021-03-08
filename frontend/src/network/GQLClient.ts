import { request } from "graphql-request";

const fetch = async (query: string) => {
  // console.log(query);
  try {
    return await request("http://localhost:3001/graphql", query);
  } catch (e) {
    console.error(e);
  }
};

export const sendGQLQuery = async <T>(query: string): Promise<T> => {
  return fetch(query);
};
