import { OvenType } from "@app/_types/dbTypes";
import { PointFilter } from "@app/_types/queryTypes";
import gql from "graphql-tag";
import {
  recordFieldsString,
  recordPageFieldsString,
  recordPointsFieldsString,
  recordPreviewFieldsString,
  targetFieldsString,
  targetPageFieldsString,
  targetPreviewFieldsString,
} from "./fields";

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

export const targetPreviewQuery = gql`
  query TargetQueryRes($id: Int) {
    targets(id: $id) {
      count
      rows {
        ${targetPreviewFieldsString}
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

export const recordPreviewQuery = gql`
  query RecordQueryRes($id: Int) {
    records(id: $id) {
      count
      rows {
        ${recordPreviewFieldsString}
      }
    }
  }
`;

export const recordPointsQuery = (filter: PointFilter) => gql`
  query RecordQueryRes($id: Int) {
    records(id: $id) {
      count
      rows {
        ${recordPointsFieldsString(filter)}
      }
    }
  }
`;
