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

import Photo from "./photo";
import Record from "../record/record";

export interface PieceAttributes {
  id: number;
  name: string;
  description: string;
}

export interface PieceCreationAttributes extends Optional<PieceAttributes, "id"> {}

class Piece extends Model<PieceAttributes, PieceCreationAttributes> implements PieceAttributes {
  // Simple fields
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign key: formula
  public formulaId!: number;

  // Foreign keys: Records through RecordPieces
  public readonly records?: Record[];
  public getRecords!: BelongsToManyGetAssociationsMixin<Record>;
  public addRecord!: BelongsToManyAddAssociationMixin<Record, number>;
  public hasRecords!: BelongsToManyHasAssociationMixin<Record, number>;
  public countRecords!: BelongsToManyCountAssociationsMixin;
  public createRecord!: BelongsToManyCreateAssociationMixin<Record>;
  public removeRecord!: BelongsToManyRemoveAssociationMixin<Record, number>;

  // Foreign keys: Photos
  public readonly photos?: Photo[];
  public getPhotos!: HasManyGetAssociationsMixin<Photo>;
  public addPhoto!: HasManyAddAssociationMixin<Photo, number>;
  public hasPhoto!: HasManyHasAssociationMixin<Photo, number>;
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
