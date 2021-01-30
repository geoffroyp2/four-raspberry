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
} from "sequelize";
import Formula from "./formula";
import Ingredient from "./ingredient";

export type ChemicalAttributes = {
  id: number;
  name: string;
  chemicalName: string;
  density: number;
};
export interface ChemicalCreationAttributes extends Optional<ChemicalAttributes, "id"> {}

class Chemical extends Model<ChemicalAttributes, ChemicalCreationAttributes> implements ChemicalAttributes {
  public id!: number;
  public name!: string;
  public chemicalName!: string;
  public density!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign keys: Ingredient when queried through Chemical - Formula association
  public readonly Ingredient?: Ingredient;

  // Foreign keys: Formulas
  public readonly formulas?: Formula[];
  public getFormulas!: BelongsToManyGetAssociationsMixin<Formula>;
  public addFormula!: BelongsToManyAddAssociationMixin<Formula, number>;
  public hasFormula!: BelongsToManyHasAssociationMixin<Formula, number>;
  public countFormulas!: BelongsToManyCountAssociationsMixin;
  public createFormula!: BelongsToManyCreateAssociationMixin<Formula>;
  public removeFormula!: BelongsToManyRemoveAssociationMixin<Formula, number>;

  public static associations: {
    formulas: Association<Chemical, Formula>;
  };
}

export const chemicalModelAttributes = {
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
  chemicalName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Sans Formule",
  },
  density: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
};

export default Chemical;
