import { ComposedQueryField } from "./queryTypes";

export type GQLSubscriptionType = LiveQuery;
export type GQLSubscriptionFieldType = LiveFields | SensorValuesFields;

type LiveSimpleFields = "status" | "currentTargetId" | "programTime" | "currentRecordId" | "monitoring" | "refresh";
type LiveComposedFields = SensorValuesQuery;
export type LiveFields = (LiveSimpleFields | LiveComposedFields)[];
type LiveQuery = ComposedQueryField<"live", LiveFields>;

type SensorValuesSimpleFields = "oxygen" | "temperature";
export type SensorValuesFields = SensorValuesSimpleFields[];
type SensorValuesQuery = ComposedQueryField<"sensors", SensorValuesFields>;
