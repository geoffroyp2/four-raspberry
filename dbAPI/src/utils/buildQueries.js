const { gql } = require("graphql-request");

const buildGQLRootQuery = (queryType, nestedQuery) =>
  gql`
    ${queryType} {
      ${nestedQuery}
    }`;

const buildGQLQuery = (query, id, fields, nestedQuery) =>
  gql`
      ${query} ${id ? `(id: ${id})` : ""} {
        ${fields}
        ${nestedQuery || ""}
      }
    `;

module.exports = {
  buildGQLRootQuery,
  buildGQLQuery,
};
