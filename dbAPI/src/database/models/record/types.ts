import { Optional } from "sequelize/types";

export interface RecordAttributes {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface RecordCreationAttributes extends Optional<RecordAttributes, "id"> {}
