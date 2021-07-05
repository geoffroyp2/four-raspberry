import gql from "graphql-tag";
import { PointFilter } from "@app/_types/queryTypes";
import { liveRecordFieldsString, liveTargetFieldsString } from "./fields";

export const liveTargetQuery = (filter: PointFilter) => gql`
  query TargetQueryRes($id: Int) {
    targets(id: $id) {
      count
      rows {
        ${liveTargetFieldsString(filter)}
      }
    }
  }
`;

export const liveRecordQuery = (filter: PointFilter) => gql`
  query RecordQueryRes($id: Int) {
    records(id: $id) {
      count
      rows {
        ${liveRecordFieldsString(filter)}
      }
    }
  }
`;
