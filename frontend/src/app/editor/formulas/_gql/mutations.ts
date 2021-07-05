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

export const getSetFormulaTargetMutation = (targetId: boolean) => gql`
  mutation setFormulaTarget($formulaId: Int! ${targetId ? ",$targetId: Int!" : ""}) {
    setFormulaTarget(formulaId: $formulaId ${targetId ? ", targetId: $targetId" : ""}) {
      ${formulaFieldsString}
    }
  }
`;
