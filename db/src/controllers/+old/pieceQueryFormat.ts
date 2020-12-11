import { Ingredient } from "../models/piece/types";

export const logStringGet = ["getOne", "getMany", "getAll", "createOne", "updateOne", "deleteOne"];
export const logStringPost = ["updateOne"];

export enum PieceGetId {
  getOne,
  getMany,
  getAll,
  createOne,
  deleteOne,
}

export enum PiecePostId {
  updateOne,
}

export interface PieceEditFilter {
  name?: string;
  description?: string;
  type?: string;
  graphRef?: string;
  composition?: Ingredient[];
  images?: string[];
  date?: string;
}

export interface PieceFindFilter {
  _id?: string;
  name?: string;
  type?: string;
  graphRef?: string;
}

export interface deleteFilter {
  _id?: string;
}

export interface PieceGetRequest {
  id: PieceGetId;
  filter?: PieceFindFilter | PieceEditFilter | deleteFilter;
}

export interface PiecePostRequest {
  id: PiecePostId;
  PieceId: string;
  filter?: PieceEditFilter;
}
