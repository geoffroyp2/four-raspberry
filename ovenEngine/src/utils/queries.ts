import { gql } from "@apollo/client";
import { LiveStatusType, Record, RecordPointCreationAttributes, SensorValuesType } from "../types/APITypes";

export const commandSubscriptionQuery = gql`
  subscription {
    command {
      name
      option
    }
  }
`;

export const getTargetQuery = (id: number) => gql`
query {
  targets( id: ${id} ) {
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

export const updateSensorsQuery = (sensors: SensorValuesType, time: number) => gql`
mutation {
  updateSensors( oxygen: ${sensors.oxygen}, temperature: ${sensors.temperature}, time: ${Math.floor(time / 1000)} )
}
`;

type StatusUpdateType = {
  status?: LiveStatusType;
  targetId?: number;
  recordId?: number;
  monitoring?: boolean;
  refresh?: boolean;
};

export const updateStatusQuery = ({ status, targetId, recordId, monitoring, refresh }: StatusUpdateType) => {
  let argString = "";
  if (status !== undefined) argString += `status: "${status}", `;
  if (targetId !== undefined) argString += `targetId: ${targetId}, `;
  if (recordId !== undefined) argString += `recordId: ${recordId}, `;
  if (monitoring !== undefined) argString += `monitoring: ${monitoring}, `;
  if (refresh !== undefined) argString += `refresh: ${refresh}, `;

  return gql`
    mutation {
      updateStatus( ${argString} )
    }
  `;
};

type RecordCreationAttributes = { name: string; description: string };

export const requestNewRecordQuery = ({ name, description }: RecordCreationAttributes) => gql`
  mutation {
    createRecord(name: "${name}", description: "${description}" ) {
      id
    }
  }
`;

export const linkTargetRecordQuery = (recordId: number, targetId: number) => gql`
mutation {
  setRecordTarget( recordId: ${recordId}, targetId: ${targetId} ) { id }
}
`;

export const updateRecordQuery = (recordId: number, { finished }: Record) => gql`
  mutation {
    updateRecord( recordId: ${recordId}, finished: ${finished} ) { id }
  }
`;

export const createRecordPointQuery = (
  recordId: number,
  { time, temperature, oxygen }: RecordPointCreationAttributes
) => gql`
  mutation {
    createRecordPoint ( recordId: ${recordId}, time: ${time}, temperature: ${temperature}, oxygen: ${oxygen} ) { id }
  }
`;
