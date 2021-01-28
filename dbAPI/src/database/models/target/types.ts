import { Optional } from "sequelize/types";

export interface TargetAttributes {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface TargetCreationAttributes extends Optional<TargetAttributes, "id"> {}
