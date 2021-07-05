import { Color } from "@app/_types/dbTypes";
import { GQLMutationArgs } from "@app/_types/mutationTypes";
import { GQLComposedQueryType, GQLQueryFieldType, GQLQueryFilterType } from "@app/_types/queryTypes";
import { GQLSubscriptionFieldType } from "@app/_types/subscriptionTypes";
import { gql } from "graphql-request";

/**
 * @param fields The typechecked fields
 * @returns a GraphQL query string
 */
const gqlStringBuilder = (fields: GQLQueryFieldType | GQLSubscriptionFieldType) => {
  return gql`
    ${nestedQueryBuilder(fields, 0)}
  `;
};

const serializeObject = (input: object): string => {
  return `{ ${Object.entries(input)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")} }`;
};
const isColor = (input: any): input is Color => {
  return input?.r !== undefined;
};
const isEmptyObject = (input: object): boolean => {
  return Object.entries(input).length === 0;
};

/**
 * outputs the arguments for a request
 * example:
 * @param filter {id: 1, name: "foo"}
 * @return "( id: 1 name: "foo" )"
 */
const filterBuilder = (filter?: GQLQueryFilterType | GQLMutationArgs): string => {
  return filter && !isEmptyObject(filter)
    ? `( ${Object.entries(filter)
        .map(([key, value]) => `${key}: ${isColor(value) ? serializeObject(value) : JSON.stringify(value)}`)
        .join(", ")} )`
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
const nestedQueryBuilder = (query: GQLQueryFieldType | GQLSubscriptionFieldType, depth: number): string => {
  const tabs = "  ".repeat(3 + depth);
  return `\n${(query as (GQLComposedQueryType | string)[])
    .map((e) => {
      if (isComposedQuery(e)) {
        return `${tabs}${e.type} ${filterBuilder(e.filter)} {${nestedQueryBuilder(e.fields, depth + 1)}${tabs}}\n`;
      } else {
        return `${tabs}${e}\n`;
      }
    })
    .join("")}`;
};

export default gqlStringBuilder;
