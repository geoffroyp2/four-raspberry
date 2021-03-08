import { gql } from "apollo-server-express";

export default gql`
  type SensorValues {
    oxygen: Float!
    temperature: Float!
  }

  type LiveValues {
    status: String!
    sensors: SensorValues!
    currentTargetId: Int!
  }

  type Subscription {
    live: LiveValues!
    command: String!
  }

  extend type Mutation {
    updateSensors(oxygen: Float, temperature: Float): Boolean!
    updateStatus(status: String!): Boolean!
    updateLiveTargetId(targetId: Int!): Boolean!
    sendCommand(command: String): Boolean!
  }
`;
