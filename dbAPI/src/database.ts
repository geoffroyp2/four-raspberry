import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig";
import { initializeSequelizeModels } from "./models/init";

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      dialect: "postgres",
      host: dbConfig.host,
      port: dbConfig.port,
    });
    initializeSequelizeModels(this.sequelize);
    console.log("Sequelize initialized");
  }
}

export default new Database().sequelize;
