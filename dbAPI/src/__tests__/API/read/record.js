const request = require("../../../utils/request");
const root = require("../../../utils/buildQueries").buildGQLRootQuery;
const  query = require("../../../utils/buildQueries").buildGQLQuery;

test("Record Read Success", async () => {
  const res = await request(root("query", query("records", 1, "id")));
  expect(res).toEqual({ records: [{ id: 1 }] });
});

test("Record Read Fail", async () => {
  const res = await request(root("query", query("records", -1, "id")));
  expect(res).toEqual({ records: [] });
});

test("Record Read Nest Success 1", async () => {
  const res = await request(root("query", query("records", 1, "id", query("pieces", 1, "id"))));
  expect(res).toEqual({
    records: [{
      id: 1,
      pieces: [{
        id: 1,
      }],
    }],
  });
});

test("Record Read Nest Success 2", async () => {
  const res = await request(root("query", query("records", 1, "id", query("pieces", 1, "id photos", query("formula", null, "id")))));
  expect(res).toEqual({
    records: [{
      id: 1,
      pieces: [{
        id: 1,
        photos: [
          "testurl2",
          "testurl1",
        ],
        formula: {
          "id": 1,
        }
      }]
    }],
  });
});

test("Record Read Nest Fail", async () => {
  const res = await request(root("query", query("records", 3, "id", query("pieces", 1, "id photos", query("formula", null, "id")))));
  expect(res).toEqual({
    records: [{
        id: 3,
        pieces: [],
    }]
  });
});


