import database from "../database";

export const query = async () => {
  return await database.query("SELECT * FROM targets UNION SELECT * FROM records");
};
