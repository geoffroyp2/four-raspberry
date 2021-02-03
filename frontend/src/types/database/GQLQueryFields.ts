/**
 * Main Types for the query builder
 */

import { OvenType } from "./GQLResTypes";

interface QueryRootFieldType<T, U, V> {
  rootType: T;
  filter?: U[];
  fields: V;
}
export type GQLRootQueryFieldsType =
  | QueryRootFieldType<"targets", TargetFilter, TargetFields>
  | QueryRootFieldType<"records", RecordFilter, RecordFields>
  | QueryRootFieldType<"pieces", PieceFilter, PieceFields>
  | QueryRootFieldType<"formulas", FormulaFilter, FormulaFields>
  | QueryRootFieldType<"chemicals", ChemicalFilter, ChemicalFields>;
export type GQLQueryFieldsType =
  | TargetFields
  | RecordFields
  | PieceFields
  | FormulaFields
  | IngredientFields
  | ChemicalFields
  | ColorFields
  | TargetPointFields
  | RecordPointFields;
export type GQLComposedFieldsType =
  | TargetComposedFields
  | RecordComposedFields
  | PieceComposedFields
  | FormulaComposedFields
  | IngredientComposedFields
  | ChemicalComposedFields;
export type GQLQueryFilterType =
  | TargetFilter
  | RecordFilter
  | PieceFilter
  | FormulaFilter
  | ChemicalFilter
  | PointFilter;

/**
 * Types representing all the possible fields for all queries
 */

interface FieldsType<T, U = void> {
  simple: T[];
  composed: U[];
}

interface ComposedFieldsType<T, U, V = any> {
  field: T;
  args: U;
  filter?: V[];
}

type QueryFilterArg<T, U> = {
  id: T;
  arg: U;
};

type PageFilter = QueryFilterArg<"page", number> | QueryFilterArg<"amount", number>;

// Types that only require simple fields
type ColorSimpleFields = "r" | "g" | "b" | "a";
export type ColorFields = FieldsType<ColorSimpleFields>;

type TargetPointSimpleFields = "id" | "time" | "temperature" | "oxygen";
export type TargetPointFields = FieldsType<TargetPointSimpleFields>;
type RecordPointSimpleFields = "id" | "time" | "temperature" | "oxygen";
export type RecordPointFields = FieldsType<RecordPointSimpleFields>;
export type PointFilter =
  | QueryFilterArg<"start", number>
  | QueryFilterArg<"end", number>
  | QueryFilterArg<"amount", number>;

// Types that can have composed nested properties
type TargetSimpleFields = "id" | "name" | "description" | "oven" | "createdAt" | "updatedAt";
type TargetComposedFields =
  | ComposedFieldsType<"color", ColorFields>
  | ComposedFieldsType<"points", TargetPointFields, PointFilter>
  | ComposedFieldsType<"records", RecordFields, RecordFilter>
  | ComposedFieldsType<"pieces", PieceFields, PieceFilter>;
export type TargetFields = FieldsType<TargetSimpleFields, TargetComposedFields>;
export type TargetFilter =
  | PageFilter
  | QueryFilterArg<"id", number>
  | QueryFilterArg<"name", string>
  | QueryFilterArg<"oven", OvenType>;

type RecordSimpleFields = "id" | "name" | "description" | "oven" | "createdAt" | "updatedAt";
type RecordComposedFields =
  | ComposedFieldsType<"color", ColorFields>
  | ComposedFieldsType<"points", RecordPointFields, PointFilter>
  | ComposedFieldsType<"target", TargetFields, TargetFilter>
  | ComposedFieldsType<"pieces", PieceFields, PieceFilter>;
export type RecordFields = FieldsType<RecordSimpleFields, RecordComposedFields>;
export type RecordFilter =
  | PageFilter
  | QueryFilterArg<"id", number>
  | QueryFilterArg<"name", string>
  | QueryFilterArg<"oven", OvenType>;

type PieceSimpleFields = "id" | "name" | "description" | "photos" | "createdAt" | "updatedAt";
type PieceComposedFields =
  | ComposedFieldsType<"records", RecordFields, RecordFilter>
  | ComposedFieldsType<"formula", FormulaFields, FormulaFilter>;
export type PieceFields = FieldsType<PieceSimpleFields, PieceComposedFields>;
export type PieceFilter = PageFilter | QueryFilterArg<"id", number> | QueryFilterArg<"name", string>;

type FormulaSimpleFields = "id" | "name" | "description" | "createdAt" | "updatedAt";
type FormulaComposedFields =
  | ComposedFieldsType<"pieces", PieceFields, PieceFilter>
  | ComposedFieldsType<"ingredients", IngredientFields, ChemicalFilter>;
export type FormulaFields = FieldsType<FormulaSimpleFields, FormulaComposedFields>;
export type FormulaFilter = PageFilter | QueryFilterArg<"id", number> | QueryFilterArg<"name", string>;

type IngredientSimpleFields = "amount";
type IngredientComposedFields = ComposedFieldsType<"chemical", ChemicalFields>;
export type IngredientFields = FieldsType<IngredientSimpleFields, IngredientComposedFields>;

type ChemicalSimpleFields = "id" | "name" | "chemicalName" | "density" | "createdAt" | "updatedAt";
type ChemicalComposedFields = ComposedFieldsType<"formulas", FormulaFields, FormulaFilter>;
export type ChemicalFields = FieldsType<ChemicalSimpleFields, ChemicalComposedFields>;
export type ChemicalFilter =
  | PageFilter
  | QueryFilterArg<"id", number>
  | QueryFilterArg<"name", string>
  | QueryFilterArg<"chemicalName", string>;
