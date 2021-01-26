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
  HasManyAddAssociationsMixin,
} from "sequelize";

import Target from "../target/model";
import { RecordAttributes, RecordCreationAttributes } from "./types";

class Record extends Model<RecordAttributes, RecordCreationAttributes> implements RecordAttributes {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTargets!: HasManyGetAssociationsMixin<Target>;
  public addTarget!: HasManyAddAssociationMixin<Target, number>;
  public addTargets!: HasManyAddAssociationsMixin<Target, number>;
  public hasTargets!: HasManyHasAssociationMixin<Target, number>;
  public countTargets!: HasManyCountAssociationsMixin;
  public createTarget!: HasManyCreateAssociationMixin<Target>;
  public removeTarget!: HasManyRemoveAssociationMixin<Target, number>;

  public readonly targets?: Target[];
  public static associations: {
    targets: Association<Record, Target>;
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
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Record;
