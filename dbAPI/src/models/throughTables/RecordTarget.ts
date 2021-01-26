import { DataTypes, Model } from "sequelize/types";

export interface RecordTargetAttributes {
  recordId: number;
  targetId: number;
}

class RecordTarget extends Model<RecordTargetAttributes> implements RecordTargetAttributes {
  public id!: number;
  public recordId!: number;
  public targetId!: number;
}

export const recordTargetModelAttributes = {
  recordId: {
    type: DataTypes.INTEGER,
  },
  targetId: {
    type: DataTypes.INTEGER,
  },
};

export default RecordTarget;
