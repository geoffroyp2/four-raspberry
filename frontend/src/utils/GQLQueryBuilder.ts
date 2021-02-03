import {
  GQLQueryFieldsType,
  GQLRootQueryFieldsType,
  GQLComposedFieldsType,
  GQLQueryFilterType,
} from "@baseTypes/database/GQLQueryFields";
import { gql } from "graphql-request";

export type GQLRootType = "query" | "mutation";

/**
 * Query builder that takes a typechecked object defined in ../types/database/GQLQueryFields
 * and outputs a valid GQL query string
 * @param root the type of request : "query" or "mutation"
 * @param query the RootQueryFieldsType object
 */

const rootQueryBuilder = (root: GQLRootType, query: GQLRootQueryFieldsType): string => {
  return gql`
${root} {
  ${query.rootType} ${filterBuilder(query.filter)} {
    count
    rows {
      ${nestedQueryBuilder(query.fields, 0)}\
    }
  }
}`;
};

/**
 * outputs the arguments for a request
 * example:
 * @param filter [{ id: "id", arg: 1 }, { id: "name", arg: "foo" }]
 * @return "(id: 1 name: "foo")"
 */
const filterBuilder = (filter?: GQLQueryFilterType[]): string => {
  return filter ? `( ${filter.reduce((acc, curr) => acc + `${curr.id}: ${curr.arg} `, "")})` : "";
};

/**
 * Recursive function that builds the sub-field requests
 * @param query
 * @param depth to correctly indent the output string (esthetics only)
 */
const nestedQueryBuilder = (query: GQLQueryFieldsType, depth: number): string => {
  const tabs = "  ".repeat(3 + depth);
  return `${query.simple && (query.simple as string[]).join(" ") + "\n"}${
    query.composed &&
    (query.composed as GQLComposedFieldsType[])
      .map(
        (e) =>
          `${tabs}${e.field} ${filterBuilder(e.filter)}{\n${tabs + "  "}${nestedQueryBuilder(
            e.args,
            depth + 1
          )}${tabs}}\n`
      )
      .join("")
  }`;
};

export default rootQueryBuilder;
