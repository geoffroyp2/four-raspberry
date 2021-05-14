import { initializeSequelizeModels } from "../../database/models/init";
import { populateTest } from "./populate";

import { Sequelize } from "sequelize";
import { dbConfig } from "../../database/config/dbConfig";
import { Timer } from "./utils";
import { exit } from "process";
import axios from "axios";
import { imageServerConfig } from "../../imageServerConfig";

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

  const { data } = await axios.get(imageServerConfig.baseUrl + "testFiles");
  console.log(data);

  if (data.length === 0) {
    console.log("ERROR: could not access test images");
  } else {
    const testImages = data.map((name: string) => "testImages/" + name);
    await populateTest(database, testImages);
  }

  console.log(`Finished (${timer.new()})`);
  exit();
};

g();
