import { PointFilter, RecordFields, TargetFields } from "@app/_types/queryTypes";
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

const targetPreviewFields: TargetFields = ["id", "name", "description", "oven", "createdAt", "updatedAt"];

export const targetPreviewFieldsString = gqlStringBuilder(targetPreviewFields);

const targetPointsFields = (filter: PointFilter): TargetFields => [
  {
    type: "points",
    filter: filter,
    fields: ["id", "temperature", "oxygen", "time"],
  },
];

export const targetPointsFieldsString = (filter: PointFilter) => gqlStringBuilder(targetPointsFields(filter));

// -----------------------------------------------
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

const recordPointsFields = (filter: PointFilter): RecordFields => [
  {
    type: "points",
    filter: filter,
    fields: ["id", "temperature", "oxygen", "time"],
  },
  {
    type: "target",
    fields: [
      {
        type: "points",
        filter: filter,
        fields: ["id", "temperature", "oxygen", "time"],
      },
    ],
  },
];

export const recordPointsFieldsString = (filter: PointFilter) => gqlStringBuilder(recordPointsFields(filter));

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
