import { gql } from "apollo-server-express";

export default gql`
  type Record {
    id: Int!
    name: String!
    description: String!
    targets: [Target]!
  }

  extend type Query {
    records(id: Int, name: String): [Record]!
    record(id: Int, name: String): Record
  }

  extend type Mutation {
    createRecord: Record!
    deleteRecord(id: Int!): Boolean!
    updateRecord(id: Int!, name: String, description: String): Record
    addTargetToRecord(recordId: Int!, targetId: Int!): Boolean!
    removeTargetFromRecord(recordId: Int!, targetId: Int!): Boolean!
  }
`;
