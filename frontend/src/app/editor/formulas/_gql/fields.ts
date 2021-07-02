import { FormulaFields } from "@app/_types/queryTypes";
import gqlStringBuilder from "@app/_utils/gqlStringBuilder";

const formulaFields: FormulaFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  {
    type: "ingredients",
    fields: [
      "amount",
      {
        type: "chemical",
        fields: ["id", "name", "chemicalName", "currentVersion", "existingVersions", "createdAt", "updatedAt"],
      },
    ],
  },
  { type: "pieces", fields: ["id", "name", "photos"] },
  { type: "target", fields: ["id", "name", "oven"] },
];
export const formulaFieldsString = gqlStringBuilder(formulaFields);

const formulaPageFields: FormulaFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  { type: "target", fields: ["id", "name", "oven"] },
];

export const formulaPageFieldsString = gqlStringBuilder(formulaPageFields);

const formulaPreviewFields: FormulaFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  { type: "target", fields: ["id", "name", "oven"] },
];

export const formulaPreviewFieldsString = gqlStringBuilder(formulaPreviewFields);
