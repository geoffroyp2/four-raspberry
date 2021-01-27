import { gql } from "apollo-server-express";

import record from "./record";
import target from "./target";

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

export default [root, record, target];
