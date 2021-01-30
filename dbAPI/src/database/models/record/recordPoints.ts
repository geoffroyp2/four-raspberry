import { DataTypes, Model } from "sequelize";

export type RecordPointAttributes = {
  id: number;
  recordId: number;
  time: number;
  temperature: number;
  oxygen: number;
};

class RecordPoint extends Model<RecordPointAttributes> implements RecordPointAttributes {
  public id!: number;
  public recordId!: number;
  public time!: number;
  public temperature!: number;
  public oxygen!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const recordPointModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  recordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  oxygen: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
};

export default RecordPoint;
