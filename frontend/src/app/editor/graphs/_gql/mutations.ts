import gql from "graphql-tag";
import { recordFieldsString } from "./fields";

const updateRecordFields = {
  name: "$name: String",
  description: "$description: String",
  color: "$color: ColorInput",
  finished: "$finished: Boolean",
};

export const getUpdateRecordMutation = (field: keyof typeof updateRecordFields) => {
  return gql`
    mutation updateRecord($recordId: Int!, ${updateRecordFields[field]}) {
      updateRecord(recordId: $recordId, ${field}:$${field}) {
        ${recordFieldsString}
      }
    }
  `;
};
