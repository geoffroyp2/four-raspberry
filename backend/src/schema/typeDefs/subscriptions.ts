import { gql } from "apollo-server-express";

export default gql`
  type SensorValues {
    oxygen: Float!
    temperature: Float!
  }

  type LiveValues {
    status: String!
    sensors: SensorValues!
    programTime: Int!
    currentTargetId: Int!
  }

  type Command {
    targetId: Int!
    status: String!
  }

  type Subscription {
    live: LiveValues!
    command: Command!
  }

  extend type Mutation {
    updateSensors(oxygen: Float!, temperature: Float!, time: Int!): Boolean!
    updateStatus(status: String!): Boolean!
    updateLiveTargetId(targetId: Int!): Boolean!
    sendCommand(command: String!): Boolean!
  }
`;
