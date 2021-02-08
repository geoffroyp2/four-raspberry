import { GQLMutationArgs, GQLMutationType, NoResMutationType } from "@baseTypes/database/GQLMutationTypes";
import {
  GQLQueryFilterType,
  GQLRootQueryType,
  GQLQueryFieldType,
  GQLComposedQueryType,
} from "@baseTypes/database/GQLQueryTypes";
import { gql } from "graphql-request";

export type GQLRootType = "query" | "mutation";

type QueryType =
  | {
      type: "query";
      query: GQLRootQueryType;
    }
  | {
      type: "mutation";
      query: GQLMutationType;
    };

export const noResField = (input: any): input is NoResMutationType => {
  return input.res === undefined;
};

/**
 * Query builder that takes a typechecked object defined in ../types/database/GQLQueryFields
 * and outputs a valid GQL query string
 * @param root the type of request : "query" or "mutation"
 * @param query the RootQueryFieldsType object
 */
const rootQueryBuilder = (query: QueryType): string => {
  switch (query.type) {
    case "query":
      return gql`
query {
  ${query.query.type} ${filterBuilder(", ", query.query.filter)} {
    count
    rows {${nestedQueryBuilder(query.query.fields, 0)}    }
  }
}`;
    case "mutation":
      return gql`
mutation {
  ${query.query.name} ${filterBuilder(",\n", query.query.args)} ${
        noResField(query.query) ? "" : `{${nestedQueryBuilder(query.query.res, 0)}    }`
      }`;
  }
};

/**
 * outputs the arguments for a request
 * example:
 * @param filter {id: 1, name: "foo"}
 * @return "( id: 1 name: "foo" )"
 */
const filterBuilder = (separator: string, filter?: GQLQueryFilterType | GQLMutationArgs): string => {
  return filter
    ? `( ${Object.entries(filter)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(separator)} )`
    : "";
};

/**
 * small runtime check for queries to separate strings (simple queries) and objects (composed queries)
 */
const isComposedQuery = (input: any): input is GQLComposedQueryType => {
  return input.type !== undefined;
};

/**
 * Recursive function that builds the sub-field requests
 * @param query
 * @param depth to correctly indent the output string (esthetics only for console debug)
 */
const nestedQueryBuilder = (query: GQLQueryFieldType, depth: number): string => {
  const tabs = "  ".repeat(3 + depth);
  return `\n${(query as (GQLComposedQueryType | string)[])
    .map((e) => {
      if (isComposedQuery(e)) {
        return `${tabs}${e.type} ${filterBuilder(", ", e.filter)} {${nestedQueryBuilder(
          e.fields,
          depth + 1
        )}${tabs}}\n`;
      } else {
        return `${tabs}${e}\n`;
      }
    })
    .join("")}`;
};

export default rootQueryBuilder;
