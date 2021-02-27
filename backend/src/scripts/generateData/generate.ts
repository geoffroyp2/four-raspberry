import { initializeSequelizeModels } from "../../database/models/init";
import { populateTest } from "./populate";

import { Sequelize } from "sequelize";
import { dbConfig } from "../../database/config/dbConfig";
import { Timer } from "./utils";
import { exit } from "process";

const database = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  logging: false,
});

initializeSequelizeModels(database);
console.log("Sequelize initialized");

const g = async () => {
  const timer = new Timer();
  await populateTest(database);

  console.log(`Finished (${timer.new()})`);
  exit();
};

g();
