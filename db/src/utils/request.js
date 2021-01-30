const { request } = require("graphql-request");

const req = async (query) => {
  return await request("http://localhost:3001/graphql", query);
};

module.exports = req;
