import { PieceFields } from "@app/_types/queryTypes";
import gqlStringBuilder from "@app/_utils/gqlStringBuilder";

const pieceFields: PieceFields = [
  "id",
  "name",
  "description",
  "photos",
  "createdAt",
  "updatedAt",
  {
    type: "records",
    fields: ["id", "name", "oven", { type: "target", fields: ["id", "name", "createdAt", "updatedAt"] }],
  },
  { type: "formula", fields: ["id", "name"] },
];
export const pieceFieldsString = gqlStringBuilder(pieceFields);

const piecePageFields: PieceFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  {
    type: "formula",
    fields: ["id", "name"],
  },
];

export const piecePageFieldsString = gqlStringBuilder(piecePageFields);

const piecePreviewFields: PieceFields = [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  {
    type: "formula",
    fields: ["id", "name"],
  },
];

export const piecePreviewFieldsString = gqlStringBuilder(piecePreviewFields);
