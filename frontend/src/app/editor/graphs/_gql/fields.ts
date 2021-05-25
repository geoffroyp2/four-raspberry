import { RecordFields, TargetFields } from "@app/_types/queryTypes";
import gqlStringBuilder from "@app/_utils/gqlStringBuilder";

const targetFields: TargetFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "records",
    fields: ["id", "name"],
  },
  { type: "color", fields: ["r", "g", "b", "a"] },
  { type: "pieces", fields: ["id", "name", "photos", { type: "formula", fields: ["name"] }] },
];

export const targetFieldsString = gqlStringBuilder(targetFields);

const targetPageFields: TargetFields = ["id", "name", "description", "oven", "createdAt", "updatedAt"];

export const targetPageFieldsString = gqlStringBuilder(targetPageFields);

const recordFields: RecordFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "target",
    fields: ["id", "name"],
  },
  { type: "color", fields: ["r", "g", "b", "a"] },
  { type: "pieces", fields: ["id", "name", { type: "formula", fields: ["name"] }, "photos"] },
];
export const recordFieldsString = gqlStringBuilder(recordFields);

const recordPageFields: RecordFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "target",
    fields: ["id", "name"],
  },
];

export const recordPageFieldsString = gqlStringBuilder(recordPageFields);

const recordPreviewFields: RecordFields = [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  {
    type: "target",
    fields: ["id", "name"],
  },
];

export const recordPreviewFieldsString = gqlStringBuilder(recordPreviewFields);
