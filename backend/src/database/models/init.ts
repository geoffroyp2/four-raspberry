import { Sequelize } from "sequelize/types";
import Photo, { photoModelAttributes } from "./piece/photo";
import Piece, { pieceModelAttributes } from "./piece/piece";
import Record, { recordModelAttributes } from "./record/record";
import Target, { targetModelAttributes } from "./target/target";
import Formula, { formulaModelAttributes } from "./formula/formula";
import Ingredient, { ingredientModelAttributes } from "./formula/ingredient";
import Chemical, { chemicalModelAttributes } from "./formula/chemical";
import TargetPoint, { targetPointModelAttributes } from "./target/targetPoints";
import RecordPoint, { recordPointModelAttributes } from "./record/recordPoints";
import ChemicalVersion, { chemicalVersionModelAttributes } from "./formula/chemicalVersion";

/**
 * Initialize models, representing a table in the DB, with attributes and options
 * @param sequelize The unique Sequelize connexion instance
 */

export const initializeSequelizeModels = (sequelize: Sequelize) => {
  Target.init(targetModelAttributes, {
    sequelize,
    tableName: "targets",
  });

  Record.init(recordModelAttributes, {
    sequelize,
    tableName: "records",
  });

  Piece.init(pieceModelAttributes, {
    sequelize,
    tableName: "pieces",
  });

  Photo.init(photoModelAttributes, {
    sequelize,
    tableName: "photos",
  });

  Formula.init(formulaModelAttributes, {
    sequelize,
    tableName: "formulas",
  });

  Ingredient.init(ingredientModelAttributes, {
    sequelize,
    tableName: "ingredients",
  });

  Chemical.init(chemicalModelAttributes, {
    sequelize,
    tableName: "chemicals",
  });

  ChemicalVersion.init(chemicalVersionModelAttributes, {
    sequelize,
    tableName: "chemicalVersions",
  });

  TargetPoint.init(targetPointModelAttributes, {
    sequelize,
    tableName: "targetPoints",
    indexes: [
      {
        name: "targetId_time_index",
        using: "BTREE",
        fields: ["targetId", "time"],
      },
    ],
  });

  RecordPoint.init(recordPointModelAttributes, {
    sequelize,
    tableName: "recordPoints",
    indexes: [
      {
        name: "recordId_time_index",
        using: "BTREE",
        fields: ["recordId", "time"],
      },
    ],
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

  // Target (1) <--> TargetPoints (n)
  Target.hasMany(TargetPoint, {
    sourceKey: "id",
    foreignKey: "targetId",
    as: "points",
  });

  // Record (1) <--> RecordPoints (n)
  Record.hasMany(RecordPoint, {
    sourceKey: "id",
    foreignKey: "recordId",
    as: "points",
  });

  // Record (n) <--> Piece (m) through RecordPieces
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

  // Formula (1) <--> Piece (n)
  Formula.hasMany(Piece, {
    sourceKey: "id",
    foreignKey: "formulaId",
    as: "pieces",
  });

  // Formula (n) <--> Chemical (m) through Ingredient (that has "amount" field)
  Formula.belongsToMany(Chemical, {
    through: {
      model: Ingredient,
      unique: false,
    },
    foreignKey: "formulaId",
    constraints: true,
  });
  Chemical.belongsToMany(Formula, {
    through: {
      model: Ingredient,
      unique: false,
    },
    foreignKey: "chemicalId",
    constraints: true,
  });

  // Chemical (1) <--> ChemicalVersion (n)
  Chemical.hasMany(ChemicalVersion, {
    sourceKey: "id",
    foreignKey: "chemicalId",
    as: "versions",
  });

  // Target (1) <--> Formula (n)
  Target.hasMany(Formula, {
    sourceKey: "id",
    foreignKey: "targetId",
    as: "formulas",
  });
};
