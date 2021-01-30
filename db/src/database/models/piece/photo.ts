import { DataTypes, Model } from "sequelize";

export type PhotoAttributes = {
  id: number;
  pieceId: number;
  url: string;
};

class Photo extends Model<PhotoAttributes> implements PhotoAttributes {
  public id!: number;
  public pieceId!: number;
  public url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const photoModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pieceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Photo;
