import { Optional } from "sequelize/types";

export interface RecordAttributes {
  id: number;
  name: string;
  description: string;
}

export interface RecordCreationAttributes extends Optional<RecordAttributes, "id"> {}
