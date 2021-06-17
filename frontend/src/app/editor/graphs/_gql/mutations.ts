import gql from "graphql-tag";
import { recordFieldsString } from "./fields";

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
