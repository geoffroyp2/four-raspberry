import { DataTypes, Model } from "sequelize";

export type ChemicalVersionAttributes = {
  id: number;
  chemicalId: number;
  name: string;
};

class ChemicalVersion extends Model<ChemicalVersionAttributes> implements ChemicalVersionAttributes {
  public id!: number;
  public chemicalId!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const chemicalVersionModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chemicalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Sans Nom",
  },
};

export default ChemicalVersion;
