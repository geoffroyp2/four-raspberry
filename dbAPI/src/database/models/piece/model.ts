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
import Photo from "../photo/model";

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
  public getRecords!: HasManyGetAssociationsMixin<Record>;
  public addRecord!: HasManyAddAssociationMixin<Record, number>;
  public hasRecords!: HasManyHasAssociationMixin<Record, number>;
  public countRecords!: HasManyCountAssociationsMixin;
  public createRecord!: HasManyCreateAssociationMixin<Record>;
  public removeRecord!: HasManyRemoveAssociationMixin<Record, number>;

  // Foreign keys: Photos
  public readonly photos?: Photo[];
  public getPhotos!: HasManyGetAssociationsMixin<Photo>;
  public addPhoto!: HasManyAddAssociationMixin<Photo, number>;
  public hasPhotos!: HasManyHasAssociationMixin<Photo, number>;
  public countPhotos!: HasManyCountAssociationsMixin;
  public createPhoto!: HasManyCreateAssociationMixin<Photo>;
  public removePhoto!: HasManyRemoveAssociationMixin<Photo, number>;

  public static associations: {
    records: Association<Piece, Record>;
    photos: Association<Piece, Photo>;
  };
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
