import { DataTypes, Model } from "sequelize";

/**
 * Through table between Chemical and Formula adding field "amount"
 */

export type IngredientAttributes = {
  id: number;
  amount: number;
  formulaId: number;
  chemicalId: number;
};

class Ingredient extends Model implements IngredientAttributes {
  public id!: number;
  public amount!: number;
  public formulaId!: number;
  public chemicalId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ingredientModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  formulaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chemicalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export default Ingredient;
