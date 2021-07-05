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

export const formulaPageQuery = gql`
  query FormulaQueryRes($page: Int, $amount: Int)  {
    formulas(page: $page, amount: $amount) {
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
