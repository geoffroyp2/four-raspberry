import { Record } from "../../models/record/types";
import { Color, Point } from "../../models/shared/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface RecordEditFilter {
  id: string;
  filter: {
    name: string;
    description: string;
    reference: string;
    color: Color;
    points: Point[];
    pieces: string[];
    date: string;
  };
}

export interface RecordDeleteFilter {
  _id: string;
}

export interface RecordFindFilter {
  _id?: string;
  reference?: string;
}

export type RecordEditType = ReqType<ReqID.updateOne, RecordEditFilter>;
export type RecordDeleteType = ReqType<ReqID.deleteOne, RecordDeleteFilter>;
export type RecordFindType = ReqType<ReqID.getMany | ReqID.getOne, RecordFindFilter>;
export type RecordGetAllType = ReqType<ReqID.getAll, null>;
export type RecordCreateType = ReqType<ReqID.createOne, null>;

export type RecordResType = ResType<Record>;
