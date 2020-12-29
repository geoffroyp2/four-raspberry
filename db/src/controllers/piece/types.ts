import { Piece } from "../../models/piece/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface PieceEditQuery {
  id: string;
  filter: PieceEditFilter;
}

export interface PieceEditFilter {
  name?: string;
  description?: string;
  records?: string[];
  images?: string[];
  formula?: string;
  date?: string;
}

export interface PieceDeleteFilter {
  _id: string;
}

export interface PieceFindFilter {
  _id?: string;
}

export type PieceEditType = ReqType<ReqID.updateOne, PieceEditQuery>;
export type PieceDeleteType = ReqType<ReqID.deleteOne, PieceDeleteFilter>;
export type PieceFindType = ReqType<ReqID.getMany | ReqID.getOne, PieceFindFilter>;
export type PieceGetAllType = ReqType<ReqID.getAll, null>;
export type PieceCreateType = ReqType<ReqID.createOne, null>;

export type PieceResType = ResType<Piece>;
