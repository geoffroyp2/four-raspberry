import { PointFilter } from "@app/_types/queryTypes";
import gql from "graphql-tag";
import { recordFieldsString, targetFieldsString, targetPointsFieldsString } from "./fields";

const updateRecordFields = {
  name: "$name: String",
  description: "$description: String",
  color: "$color: ColorInput",
  finished: "$finished: Boolean",
};

export const getUpdateRecordMutation = (field: keyof typeof updateRecordFields) => gql`
    mutation updateRecord($recordId: Int!, ${updateRecordFields[field]}) {
      updateRecord(recordId: $recordId, ${field}:$${field}) {
        ${recordFieldsString}
      }
    }
  `;

export const getSetRecordTargetMutation = (targetId: boolean) => gql`
  mutation setRecordTarget($recordId: Int! ${targetId ? ",$targetId: Int!" : ""}) {
    setRecordTarget(recordId: $recordId ${targetId ? ", targetId: $targetId" : ""}) {
      ${recordFieldsString}
    }
  }
`;

export const createRecordMutation = gql`
  mutation createRecord {
    createRecord {
      ${recordFieldsString}
    }
  }
`;

export const deleteRecordMutation = gql`
  mutation deleteRecord($recordId: Int!) {
    deleteRecord(recordId: $recordId)
  }
`;

const updateTargetFields = {
  name: "$name: String",
  description: "$description: String",
  color: "$color: ColorInput",
  oven: "$oven: String",
};

export const getUpdateTargetMutation = (field: keyof typeof updateTargetFields) => gql`
    mutation updateTarget($targetId: Int!, ${updateTargetFields[field]}) {
      updateTarget(targetId: $targetId, ${field}:$${field}) {
        ${targetFieldsString}
      }
    }
  `;

export const getSetTargetPointsMutation = (filter: PointFilter) => gql`
  mutation setTargetAllPoints($targetId: Int!, $points: [TargetPointInput]!) {
    setTargetAllPoints(targetId: $targetId, points: $points) {
      ${targetPointsFieldsString(filter)}
    }
  }
`;

export const createTargetMutation = gql`
  mutation createTarget {
    createTarget {
      ${targetFieldsString}
    }
  }
`;

export const deleteTargetMutation = gql`
  mutation deleteTarget($targetId: Int!) {
    deleteTarget(targetId: $targetId)
  }
`;
