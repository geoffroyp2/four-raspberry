import { DataTypes, Model } from "sequelize";

export type TargetPointAttributes = {
  id: number;
  targetId: number;
  time: number;
  temperature: number;
  oxygen: number;
};

class TargetPoint extends Model<TargetPointAttributes> implements TargetPointAttributes {
  public id!: number;
  public targetId!: number;
  public time!: number;
  public temperature!: number;
  public oxygen!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const targetPointModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  targetId: {
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

export default TargetPoint;
