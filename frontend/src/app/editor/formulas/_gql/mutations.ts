import gql from "graphql-tag";
import { formulaFieldsString } from "./fields";

const updateFormulaFields = {
  name: "$name: String",
  description: "$description: String",
};

export const getUpdateFormulaMutation = (field: keyof typeof updateFormulaFields) => gql`
    mutation updateFormula($formulaId: Int!, ${updateFormulaFields[field]}) {
      updateFormula(formulaId: $formulaId, ${field}:$${field}) {
        ${formulaFieldsString}
      }
    }
  `;
