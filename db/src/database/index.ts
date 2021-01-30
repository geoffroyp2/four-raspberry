import { Sequelize } from "sequelize";
import { dbConfig } from "./config/dbConfig";

/**
 * The only sequelize instance
 */
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  dialect: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
});

export default sequelize;
