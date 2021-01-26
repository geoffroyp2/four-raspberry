import { Sequelize } from "sequelize/types";
import Record, { recordModelAttributes } from "./record/model";
import Target, { targetModelAttributes } from "./target/model";
import RecordTarget, { recordTargetModelAttributes } from "./throughTables/RecordTarget";

const associate = () => {
  // Record.hasOne(Target, { sourceKey: "id" });
  // Target.belongsToMany(Record, { through: "RecordTargets" });
  // Target.hasMany(Record, {
  //   sourceKey: "id",
  //   foreignKey: "targetId",
  // });
  // Record.belongsToMany(Target);

  Target.belongsToMany(Record, {
    through: {
      model: "RecordTarget",
      unique: false,
    },
    foreignKey: "targetId",
    constraints: false,
  });

  Record.belongsToMany(Target, {
    through: {
      model: "RecordTarget",
      unique: false,
    },
    foreignKey: "recordId",
    constraints: false,
  });
};

export const initializeSequelizeModels = (sequelize: Sequelize) => {
  Target.init(targetModelAttributes, {
    sequelize: sequelize,
    tableName: "targets",
  });

  Record.init(recordModelAttributes, {
    sequelize: sequelize,
    tableName: "records",
  });

  // RecordTarget.init(recordTargetModelAttributes, {
  //   sequelize: sequelize,
  //   tableName: "RecordTarget",
  // });

  associate();
};
