import {
  Model,
  Optional,
  DataTypes,
  Association,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";

import Piece from "../piece/piece";
import Chemical from "./chemical";
import Ingredient from "./ingredient";

export interface FormulaAttributes {
  id: number;
  name: string;
  description: string;
}
export interface FormulaCreationAttributes extends Optional<FormulaAttributes, "id"> {}

class Formula extends Model<FormulaAttributes, FormulaCreationAttributes> implements FormulaAttributes {
  // Simple fields
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign keys: Piece
  public readonly pieces?: Piece[];
  public getPieces!: HasManyGetAssociationsMixin<Piece>;
  public addPiece!: HasManyAddAssociationMixin<Piece, number>;
  public hasPiece!: HasManyHasAssociationMixin<Piece, number>;
  public countPieces!: HasManyCountAssociationsMixin;
  public createPiece!: HasManyCreateAssociationMixin<Piece>;
  public removePiece!: HasManyRemoveAssociationMixin<Piece, number>;

  // Foreign keys: Ingredient when queried through Chemical - Formula association
  public readonly Ingredient?: Ingredient;

  // Foreign keys: Chemicals
  public readonly chemicals?: Chemical[];
  public getChemicals!: BelongsToManyGetAssociationsMixin<Chemical>;
  public addChemical!: BelongsToManyAddAssociationMixin<Chemical, number>;
  public hasChemical!: BelongsToManyHasAssociationMixin<Chemical, number>;
  public countChemicals!: BelongsToManyCountAssociationsMixin;
  public createChemical!: BelongsToManyCreateAssociationMixin<Chemical>;
  public removeChemical!: BelongsToManyRemoveAssociationMixin<Chemical, number>;

  public static associations: {
    chemicals: Association<Formula, Chemical>;
    pieces: Association<Formula, Piece>;
  };
}

export const formulaModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Sans Nom",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
};

export default Formula;
