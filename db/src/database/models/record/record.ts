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
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";

import Piece from "../piece/piece";
import RecordPoint from "./recordPoints";

export interface RecordAttributes {
  id: number;
  name: string;
  description: string;
  color: string;
}
export interface RecordCreationAttributes extends Optional<RecordAttributes, "id"> {}

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
  public getPieces!: BelongsToManyGetAssociationsMixin<Piece>;
  public addPiece!: BelongsToManyAddAssociationMixin<Piece, number>;
  public hasPiece!: BelongsToManyHasAssociationMixin<Piece, number>;
  public countPieces!: BelongsToManyCountAssociationsMixin;
  public createPiece!: BelongsToManyCreateAssociationMixin<Piece>;
  public removePiece!: BelongsToManyRemoveAssociationMixin<Piece, number>;

  // Foreign keys: Points
  public readonly points?: RecordPoint[];
  public getPoints!: HasManyGetAssociationsMixin<RecordPoint>;
  public addPoint!: HasManyAddAssociationMixin<RecordPoint, number>;
  public hasPoint!: HasManyHasAssociationMixin<RecordPoint, number>;
  public countPoints!: HasManyCountAssociationsMixin;
  public createPoint!: HasManyCreateAssociationMixin<RecordPoint>;
  public removePoint!: HasManyRemoveAssociationMixin<RecordPoint, number>;

  public static associations: {
    pieces: Association<Record, Piece>;
    points: Association<Record, RecordPoint>;
  };
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
