import { gql } from "graphql-request";

export const RecordDataRequest = (id: number) => gql`
  query {
    records (id: ${id}) {
      id
      name
      description
      oven
      target {
        id
        name
      }
    }
  }
`;

export const recordListRequest = (page: number, amount: number) => gql`
  query {
    records {
      id
      name
      oven
    }
  }
`;
