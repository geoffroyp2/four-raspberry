import { initializeSequelizeModels } from "../../database/models/init";
import { Sequelize } from "sequelize";
import { dbConfig } from "../../database/config/dbConfig";
import { exit } from "process";

const database = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  logging: false,
});

const syncdb = async () => {
  initializeSequelizeModels(database);
  await database.sync({ alter: true, force: false });
  console.log("Database synchronized with models");
  exit();
};

syncdb();
