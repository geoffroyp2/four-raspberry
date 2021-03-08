import {
  Chemical,
  Color,
  Formula,
  Ingredient,
  OvenType,
  Piece,
  Record,
  RecordPoint,
  Target,
  TargetPoint,
} from "./GQLResTypes";

/**
 * Types used by the query builder to enfore typechecking before the GraphQL query creation
 */

export type GQLRootQueryType = TargetQuery | RecordQuery | PieceQuery | FormulaQuery | ChemicalQuery;
export type GQLComposedQueryType =
  | TargetQuery
  | RecordQuery
  | PieceQuery
  | FormulaQuery
  | ChemicalQuery
  | IngredientQuery
  | ColorQuery
  | TargetPointQuery
  | RecordPointQuery;
export type GQLQueryFieldType =
  | TargetFields
  | RecordFields
  | PieceFields
  | FormulaFields
  | ChemicalFields
  | IngredientFields
  | ColorFields
  | TargetPointFields
  | RecordPointFields;
export type GQLQueryFilterType =
  | TargetFilter
  | RecordFilter
  | PieceFilter
  | FormulaFilter
  | ChemicalFilter
  | PointFilter
  | PageFilter;

export type ComposedQueryField<T, U, V = undefined> = {
  type: T;
  fields: U;
  filter?: V;
};

type QueryFilter<T extends string, U> = {
  [_ in T]?: U;
};

type SimpleFields =
  // Main types
  | "id"
  | "name"
  | "description"
  | "oven"
  | "photos"
  | "amount"
  | "chemicalName"
  | "density"
  | "createdAt"
  | "updatedAt"
  // Color
  | "r"
  | "g"
  | "b"
  | "a"
  // Points
  | "time"
  | "temperature"
  | "oxygen";

export type PageFilter = QueryFilter<"page" | "amount", number>;
export type PointFilter = QueryFilter<"start" | "end" | "amount", number>;

type TargetSimpleFields = Extract<keyof Target, SimpleFields>;
type TargetComposedFields = ColorQuery | RecordQuery | PieceQuery | TargetPointQuery;
export type TargetFields = (TargetSimpleFields | TargetComposedFields)[];
type TargetFilter = PageFilter &
  QueryFilter<"id", number> &
  QueryFilter<"name", string> &
  QueryFilter<"oven", OvenType>;
export type TargetQuery = ComposedQueryField<"target" | "targets", TargetFields, TargetFilter>;

type RecordSimpleFields = Extract<keyof Record, SimpleFields>;
type RecordComposedFields = TargetQuery | ColorQuery | PieceQuery | RecordPointQuery;
export type RecordFields = (RecordSimpleFields | RecordComposedFields)[];
type RecordFilter = PageFilter & QueryFilter<"id", number> & QueryFilter<"name", string>;
export type RecordQuery = ComposedQueryField<"records", RecordFields, RecordFilter>;

type PieceSimpleFields = Extract<keyof Piece, SimpleFields>;
type PieceComposedFields = RecordQuery | FormulaQuery;
export type PieceFields = (PieceSimpleFields | PieceComposedFields)[];
type PieceFilter = PageFilter & QueryFilter<"id", number> & QueryFilter<"name", string>;
export type PieceQuery = ComposedQueryField<"pieces", PieceFields, PieceFilter>;

type FormulaSimpleFields = Extract<keyof Formula, SimpleFields>;
type FormulaComposedFields = IngredientQuery | PieceQuery;
export type FormulaFields = (FormulaSimpleFields | FormulaComposedFields)[];
type FormulaFilter = PageFilter & QueryFilter<"id", number> & QueryFilter<"name", string>;
export type FormulaQuery = ComposedQueryField<"formula" | "formulas", FormulaFields, FormulaFilter>;

type IngredientFields = (Extract<keyof Ingredient, SimpleFields> | ChemicalQuery)[];
export type IngredientQuery = ComposedQueryField<"ingredients", IngredientFields>;

type ChemicalSimpleFields = Extract<keyof Chemical, SimpleFields>;
type ChemicalComposedFields = FormulaQuery | ColorQuery;
export type ChemicalFields = (ChemicalSimpleFields | ChemicalComposedFields)[];
type ChemicalFilter = PageFilter & QueryFilter<"id", number> & QueryFilter<"name" | "chemicalName", string>;
export type ChemicalQuery = ComposedQueryField<"chemical", ChemicalFields, ChemicalFilter>;

export type ColorFields = Extract<keyof Color, SimpleFields>[];
export type ColorQuery = ComposedQueryField<"color", ColorFields>;

export type TargetPointFields = Extract<keyof TargetPoint, SimpleFields>[];
export type TargetPointQuery = ComposedQueryField<"points", TargetPointFields, PointFilter>;

export type RecordPointFields = Extract<keyof RecordPoint, SimpleFields>[];
export type RecordPointQuery = ComposedQueryField<"points", RecordPointFields, PointFilter>;
