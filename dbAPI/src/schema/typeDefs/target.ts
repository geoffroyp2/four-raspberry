import { gql } from "apollo-server-express";

export default gql`
  type Target {
    id: Int!
    name: String
    description: String
    records: [Record]
  }

  extend type Query {
    targets(id: Int, name: String): [Target]!
    target(id: Int, name: String): Target
  }

  extend type Mutation {
    createTarget: Record!
    deleteTarget(id: Int!): Boolean!
    updateTarget(id: Int!, name: String, description: String): Record
    addRecordToTarget(recordId: Int!, targetId: Int!): Boolean!
    removeRecordFromTarget(recordId: Int!, targetId: Int!): Boolean!
  }
`;
