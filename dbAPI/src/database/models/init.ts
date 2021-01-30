import { Sequelize } from "sequelize/types";
import Photo, { photoModelAttributes } from "./piece/photo";
import Piece, { pieceModelAttributes } from "./piece/piece";
import Record, { recordModelAttributes } from "./record/record";
import Target, { targetModelAttributes } from "./target/target";
import Formula, { formulaModelAttributes } from "./formula/formula";
import Ingredient, { ingredientModelAttributes } from "./formula/ingredient";
import Chemical, { chemicalModelAttributes } from "./formula/chemical";
import TargetPoint, { targetPointModelAttributes } from "./target/targetPoints";

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

  Formula.init(formulaModelAttributes, {
    sequelize: sequelize,
    tableName: "formulas",
  });

  Ingredient.init(ingredientModelAttributes, {
    sequelize: sequelize,
    tableName: "ingredients",
  });

  Chemical.init(chemicalModelAttributes, {
    sequelize: sequelize,
    tableName: "chemicals",
  });

  TargetPoint.init(targetPointModelAttributes, {
    sequelize: sequelize,
    tableName: "targetPoints",
    indexes: [
      {
        name: "targetId_time_index",
        using: "BTREE",
        fields: ["targetId", "time"],
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
};
