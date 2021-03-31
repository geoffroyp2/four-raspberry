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
import Formula from "./formula";
import Ingredient from "./ingredient";
import ChemicalVersion from "./chemicalVersion";

export type ChemicalAttributes = {
  id: number;
  name: string;
  chemicalName: string;
  currentVersion: string;
  color: string;
};
export interface ChemicalCreationAttributes extends Optional<ChemicalAttributes, "id"> {}

class Chemical extends Model<ChemicalAttributes, ChemicalCreationAttributes> implements ChemicalAttributes {
  public id!: number;
  public name!: string;
  public chemicalName!: string;
  public color!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Foreign key: Ingredient when queried through Chemical - Formula association
  public readonly Ingredient?: Ingredient;

  // Current version id
  public readonly currentVersion!: string;

  // Forign key: ChemicalVersion (for different suppliers)
  public readonly versions?: ChemicalVersion[];
  public getVersions!: HasManyGetAssociationsMixin<ChemicalVersion>;
  public addVersion!: HasManyAddAssociationMixin<ChemicalVersion, number>;
  public hasVersion!: HasManyHasAssociationMixin<ChemicalVersion, number>;
  public countVersions!: HasManyCountAssociationsMixin;
  public createVersion!: HasManyCreateAssociationMixin<ChemicalVersion>;
  public removeVersion!: HasManyRemoveAssociationMixin<ChemicalVersion, number>;

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
    versions: Association<Chemical, ChemicalVersion>;
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
    defaultValue: "Sans Nom Chimique",
  },
  currentVersion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: new DataTypes.STRING(15),
    allowNull: false,
    defaultValue: "210-210-210-0.9",
  },
};

export default Chemical;
