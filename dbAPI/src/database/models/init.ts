import { Sequelize } from "sequelize/types";
import Piece, { pieceModelAttributes } from "./piece/model";
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

  Piece.init(pieceModelAttributes, {
    sequelize: sequelize,
    tableName: "pieces",
  });

  associate();
};

/**
 * Creates associations, linking join tables when necessary
 * Also creates associated methods like Target.getRecords()
 */

const associate = () => {
  // Target -- Record : 1 <-> n
  Target.hasMany(Record, {
    sourceKey: "id",
    foreignKey: "targetId",
    as: "records",
  });

  // Record -- Piece: n <-> m
  Record.belongsToMany(Piece, {
    through: {
      model: "RecordPieces",
      unique: false,
    },
    foreignKey: "recordId",
    // constraints: so that rows are deleted from "RecordPieces" when a row is deleted from records or pieces
    constraints: true,
  });
  Piece.belongsToMany(Record, {
    through: {
      model: "RecordPieces",
      unique: false,
    },
    foreignKey: "pieceId",
    constraints: true,
  });
};
