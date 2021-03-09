import { SensorValuesType } from "../types/APITypes";

export const liveSubscriptionQuery = `
subscription {
  live {
    status
    currentTargetId
  }
}`;

export const commandSubscriptionQuery = `
subscription {
  command
}`;

export const getTargetQuery = (id: number) => `
query {
  targets(id: ${id}) {
    rows {
      id
      name
      oven
      points {
        id
        oxygen
        time
        temperature
      }
    }
  }
}`;

export const getUpdateSensorsQuery = (sensors: SensorValuesType) => `
mutation {
  updateSensors(oxygen: ${sensors.oxygen}, temperature: ${sensors.temperature})
}
`;
