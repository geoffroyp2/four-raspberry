import { Sequelize } from "sequelize/types";
import Photo, { photoModelAttributes } from "./photo/model";
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

  Photo.init(photoModelAttributes, {
    sequelize: sequelize,
    tableName: "photos",
  });

  associate();
};

/**
 * Creates associations, linking join tables when necessary
 * Also creates associated methods like Target.getRecords()
 */

const associate = () => {
  // Target (1) <--> Record (n)
  Target.hasMany(Record, {
    sourceKey: "id",
    foreignKey: "targetId",
    as: "records",
  });

  // Record (n) <--> Piece (m)
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

  // Piece (1) <--> Photo (n)
  Piece.hasMany(Photo, {
    sourceKey: "id",
    foreignKey: "pieceId",
    as: "photos",
  });
};
