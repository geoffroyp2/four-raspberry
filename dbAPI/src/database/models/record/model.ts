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

import Piece from "../piece/model";
import { RecordAttributes, RecordCreationAttributes } from "./types";

class Record extends Model<RecordAttributes, RecordCreationAttributes> implements RecordAttributes {
  // Simple fields
  public id!: number;
  public name!: string;
  public description!: string;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign key: target
  public targetId!: number | null;

  // Foreign keys: Pieces through RecordPieces
  public readonly pieces?: Piece[];
  public static associations: {
    pieces: Association<Record, Piece>;
  };
  public getPieces!: HasManyGetAssociationsMixin<Piece>;
  public addPiece!: HasManyAddAssociationMixin<Piece, number>;
  public hasPieces!: HasManyHasAssociationMixin<Piece, number>;
  public countPieces!: HasManyCountAssociationsMixin;
  public createPiece!: HasManyCreateAssociationMixin<Piece>;
  public removePiece!: HasManyRemoveAssociationMixin<Piece, number>;
}

export const recordModelAttributes = {
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
  color: {
    type: new DataTypes.STRING(15),
    allowNull: false,
    defaultValue: "210-210-210-0.9",
  },
  targetId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
};

export default Record;
