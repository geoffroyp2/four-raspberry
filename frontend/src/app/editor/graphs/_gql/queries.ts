import { OvenType } from "@app/_types/dbTypes";
import gql from "graphql-tag";
import { recordFieldsString, recordPageFieldsString, targetFieldsString, targetPageFieldsString } from "./fields";

export type TargetQueryParams = {
  variables: {
    id: number;
    name?: string;
    oven?: OvenType;
  };
};

export type RecordQueryParams = {
  variables: {
    id: number;
    name?: string;
    oven?: OvenType;
    finished?: boolean;
  };
};

export const targetQuery = gql`
  query TargetQueryRes($id: Int, $name: String, $oven: String) {
    targets(id: $id, name: $name, oven: $oven) {
      count
      rows {
        ${targetFieldsString}
      }
    }
  }
`;

export const targetPageQuery = gql`
  query TargetQueryRes($page: Int, $amount: Int)  {
    targets(page: $page, amount: $amount) {
      count
      rows {
        ${targetPageFieldsString}
      }
    }
  }
`;

export const recordQuery = gql`
  query RecordQueryRes($id: Int, $name: String, $oven: String, $finished: Boolean) {
    records(id: $id, name: $name, oven: $oven, finished: $finished) {
      count
      rows {
        ${recordFieldsString}
      }
    }
  }
`;

export const recordPageQuery = gql`
  query RecordQueryRes($page: Int, $amount: Int)  {
    records(page: $page, amount: $amount) {
      count
      rows {
        ${recordPageFieldsString}
      }
    }
  }
`;
