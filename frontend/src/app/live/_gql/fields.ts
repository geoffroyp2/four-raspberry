import { PointFilter, RecordFields, TargetFields } from "@app/_types/queryTypes";
import { LiveFields } from "@app/_types/subscriptionTypes";
import gqlStringBuilder from "@app/_utils/gqlStringBuilder";

const liveFields: LiveFields = [
  "status",
  "refresh",
  "programTime",
  "currentTargetId",
  "currentRecordId",
  "monitoring",
  { type: "sensors", fields: ["oxygen", "temperature"] },
];
export const liveFieldsString = gqlStringBuilder(liveFields);

const liveTargetFields = (filter: PointFilter): TargetFields => [
  "id",
  "name",
  "description",
  "oven",
  "createdAt",
  "updatedAt",
  { type: "color", fields: ["r", "g", "b", "a"] },
  {
    type: "points",
    filter: filter,
    fields: ["id", "temperature", "oxygen", "time"],
  },
];

export const liveTargetFieldsString = (filter: PointFilter) => gqlStringBuilder(liveTargetFields(filter));

const liveRecordFields = (filter: PointFilter): RecordFields => [
  "id",
  "name",
  "description",
  "createdAt",
  "updatedAt",
  { type: "color", fields: ["r", "g", "b", "a"] },
  {
    type: "points",
    filter: filter,
    fields: ["id", "temperature", "oxygen", "time"],
  },
];

export const liveRecordFieldsString = (filter: PointFilter) => gqlStringBuilder(liveRecordFields(filter));
