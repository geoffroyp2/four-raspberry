import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
} from "sequelize";
import Record from "../record/model";

// import Target from "../target/model";
import { TargetAttributes, TargetCreationAttributes } from "./types";

class Target extends Model<TargetAttributes, TargetCreationAttributes> implements TargetAttributes {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRecords!: HasManyGetAssociationsMixin<Record>;
  public addRecord!: HasManyAddAssociationMixin<Record, number>;
  public addRecords!: HasManyAddAssociationsMixin<Record, number>;
  public hasRecords!: HasManyHasAssociationMixin<Record, number>;
  public countRecords!: HasManyCountAssociationsMixin;
  public createRecord!: HasManyCreateAssociationMixin<Record>;
  public removeRecord!: HasManyRemoveAssociationMixin<Record, number>;

  public readonly records?: Record[];
  public static associations: {
    record: Association<Target, Record>;
  };
}

export const targetModelAttributes = {
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

export default Target;
