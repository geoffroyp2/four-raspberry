import { ComposedQueryField } from "./GQLQueryTypes";

export type GQLSubscriptionType = LiveQuery;
export type GQLSubscriptionFieldType = LiveFields | SensorValuesFields;

type LiveSimpleFields = "status" | "currentTargetId";
type LiveComposedFields = SensorValuesQuery;
type LiveFields = (LiveSimpleFields | LiveComposedFields)[];
type LiveQuery = ComposedQueryField<"live", LiveFields>;

type SensorValuesSimpleFields = "oxygen" | "temperature";
type SensorValuesFields = SensorValuesSimpleFields[];
type SensorValuesQuery = ComposedQueryField<"sensors", SensorValuesFields>;
