import { Sequelize } from "sequelize/types";
import Record, { recordModelAttributes } from "./record/model";
import Target, { targetModelAttributes } from "./target/model";

/**
 * Initialize models, representing a table in the DB, with attributes and options
 * @param sequelize The unique Sequelize connexion instance
 */

export const initializeSequelizeModels = (sequelize: Sequelize) => {
  Target.init(targetModelAttributes, {
    sequelize: sequelize,
    tableName: "targets",
  });

  Record.init(recordModelAttributes, {
    sequelize: sequelize,
    tableName: "records",
  });

  associate();
};

/**
 * Creates associations, linking join tables when necessary
 * Also creates associated methods like Target.getRecords()
 */

const associate = () => {
  Target.belongsToMany(Record, {
    through: {
      model: "RecordTargets",
      unique: false,
    },
    foreignKey: "targetId",
    // constraints: so that rows are deleted from "RecordTargets" when a row is deleted from records or targets
    constraints: true,
  });

  Record.belongsToMany(Target, {
    through: {
      model: "RecordTargets",
      unique: false,
    },
    foreignKey: "recordId",
    constraints: true,
  });
};
