import {
  Association,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
} from "sequelize";

import Record from "../record/model";
import { PieceAttributes, PieceCreationAttributes } from "./types";

class Piece extends Model<PieceAttributes, PieceCreationAttributes> implements PieceAttributes {
  // Simple fields
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign key: formula
  // public formulaId!: number;

  // Foreign keys: Records through RecordPieces
  public readonly records?: Record[];
  public static associations: {
    records: Association<Piece, Record>;
  };
  public getRecords!: HasManyGetAssociationsMixin<Record>;
  public addRecord!: HasManyAddAssociationMixin<Record, number>;
  public hasRecords!: HasManyHasAssociationMixin<Record, number>;
  public countRecords!: HasManyCountAssociationsMixin;
  public createRecord!: HasManyCreateAssociationMixin<Record>;
  public removeRecord!: HasManyRemoveAssociationMixin<Record, number>;
}

export const pieceModelAttributes = {
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

export default Piece;
