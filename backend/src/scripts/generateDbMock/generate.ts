import { initializeSequelizeModels } from "../../database/models/init";
import database from "../../database";
import Target from "../../database/models/target/target";
import Record from "../../database/models/record/record";
import { link } from "./linkElements";
import { populateTest } from "./populate";
import RecordPoint from "../../database/models/record/recordPoints";
import TargetPoint from "../../database/models/target/targetPoints";

initializeSequelizeModels(database);
console.log("Sequelize initialized");

const g = async () => {
  await populateTest();

  console.log("FINI");
};

g();
