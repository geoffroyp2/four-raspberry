const request = require("../../../utils/request");
const root = require("../../../utils/buildQueries").buildGQLRootQuery;
const  query = require("../../../utils/buildQueries").buildGQLQuery;

test("Target Read Success", async () => {
  const res = await request(root("query", query("targets", 1, "id")));
  expect(res).toEqual({ targets: [{ id: 1 }] });
});

test("Target Read Fail", async () => {
  const res = await request(root("query", query("targets", -1, "id")));
  expect(res).toEqual({ targets: [] });
});

test("Target Read Nest Success 1", async () => {
  const res = await request(root("query", query("targets", 1, "id", query("records", 1, "id"))));
  expect(res).toEqual({
    targets: [{
      id: 1,
      records: [{
        id: 1,
      }],
    }],
  });
});

test("Target Read Nest Success 2", async () => {
  const res = await request(root("query", query("targets", 1, "id", query("records", 1, "id", query("pieces", 1, "id")))));
  expect(res).toEqual({
    targets: [{
      id: 1,
      records: [{
        id: 1,
        pieces: [{
          id: 1,
        }]
      }],
    }],
  });
});

test("Target Read Nest Fail", async () => {
  const res = await request(root("query", query("targets", 2, "id", query("records", 2, "id", query("pieces", 1, "id")))));
  expect(res).toEqual({
    targets: [{
      id: 2,
      records: [],
    }],
  });
});


