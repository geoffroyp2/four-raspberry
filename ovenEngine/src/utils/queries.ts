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
  command {
    targetId
    status
  }
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

export const getUpdateSensorsQuery = (sensors: SensorValuesType, time: number) => `
mutation {
  updateSensors(oxygen: ${sensors.oxygen}, temperature: ${sensors.temperature}, time: ${Math.floor(time / 1000)})
}
`;
