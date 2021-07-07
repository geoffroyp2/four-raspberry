import { PageQueryParams } from "@editor/_gql/types";
import gql from "graphql-tag";

import { formulaFieldsString, formulaPageFieldsString, formulaPreviewFieldsString } from "./fields";

export type FormulaQueryParams = {
  variables: {
    id: number;
    name?: string;
  };
};

export const formulaQuery = gql`
  query FormulaQueryRes($id: Int, $name: String) {
    formulas(id: $id, name: $name) {
      count
      rows {
        ${formulaFieldsString}
      }
    }
  }
`;

export type FormulaSortParams = {
  sortBy: "name" | "id" | "createdAt" | "updatedAt" | "target";
  order: "ASC" | "DESC";
};
export type FormulaPageQueryParams = PageQueryParams & { variables: { sort?: FormulaSortParams } };

export const formulaPageQuery = gql`
  query FormulaQueryRes($page: Int, $amount: Int, $name: String, $sort: SortInput)  {
    formulas(page: $page, amount: $amount, name: $name, sort: $sort) {
      count
      rows {
        ${formulaPageFieldsString}
      }
    }
  }
`;

export const formulaPreviewQuery = gql`
  query FormulaQueryRes($id: Int) {
    formulas(id: $id) {
      count
      rows {
        ${formulaPreviewFieldsString}
      }
    }
  }
`;
