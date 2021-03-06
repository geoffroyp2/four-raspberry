import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
} from "sequelize";
import { Optional } from "sequelize/types";
import Formula from "../formula/formula";

import Record from "../record/record";
import TargetPoint from "./targetPoints";

export type OvenType = "gaz" | "electrique";
export interface TargetAttributes {
  id: number;
  name: string;
  description: string;
  color: string;
  oven: OvenType;
}
export interface TargetCreationAttributes extends Optional<TargetAttributes, "id"> {}

class Target extends Model<TargetAttributes, TargetCreationAttributes> implements TargetAttributes {
  // Simple fields
  public id!: number;
  public name!: string;
  public description!: string;
  public color!: string;
  public oven!: OvenType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign keys: Records
  public readonly records?: Record[];
  public getRecords!: HasManyGetAssociationsMixin<Record>;
  public addRecord!: HasManyAddAssociationMixin<Record, number>;
  public hasRecord!: HasManyHasAssociationMixin<Record, number>;
  public countRecords!: HasManyCountAssociationsMixin;
  public createRecord!: HasManyCreateAssociationMixin<Record>;
  public removeRecord!: HasManyRemoveAssociationMixin<Record, number>;

  // Foreign keys: Formulas
  public readonly formulas?: Formula[];
  public getFormulas!: HasManyGetAssociationsMixin<Formula>;
  public addFormula!: HasManyAddAssociationMixin<Formula, number>;
  public hasFormula!: HasManyHasAssociationMixin<Formula, number>;
  public countFormulas!: HasManyCountAssociationsMixin;
  public createFormula!: HasManyCreateAssociationMixin<Formula>;
  public removeFormula!: HasManyRemoveAssociationMixin<Formula, number>;

  // Foreign keys: Points
  public readonly points?: TargetPoint[];
  public getPoints!: HasManyGetAssociationsMixin<TargetPoint>;
  public addPoint!: HasManyAddAssociationMixin<TargetPoint, number>;
  public hasPoint!: HasManyHasAssociationMixin<TargetPoint, number>;
  public countPoints!: HasManyCountAssociationsMixin;
  public createPoint!: HasManyCreateAssociationMixin<TargetPoint>;
  public removePoint!: HasManyRemoveAssociationMixin<TargetPoint, number>;

  public static associations: {
    records: Association<Target, Record>;
    formulas: Association<Target, Formula>;
    points: Association<Target, TargetPoint>;
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
  oven: {
    type: new DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "gaz",
  },
};

export default Target;
