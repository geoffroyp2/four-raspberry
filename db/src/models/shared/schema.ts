import { Schema } from "mongoose";

export const ColorSchema = new Schema({
  r: Number,
  g: Number,
  b: Number,
  a: Number,
});
