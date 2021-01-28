import { Optional } from "sequelize/types";

export interface PieceAttributes {
  id: number;
  name: string;
  description: string;
}

export interface PieceCreationAttributes extends Optional<PieceAttributes, "id"> {}
