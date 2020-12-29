import { Reference } from "../../models/reference/types";
import { Color, Point } from "../../models/shared/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface ReferenceEditQuery {
  id: string;
  filter: ReferenceEditFilter;
}

export interface ReferenceEditFilter {
  name?: string;
  description?: string;
  color?: Color;
  points?: Point[];
  records?: string[];
}

export interface ReferenceDeleteFilter {
  _id: string;
}

export interface ReferenceFindFilter {
  _id?: string;
}

export type ReferenceEditType = ReqType<ReqID.updateOne, ReferenceEditQuery>;
export type ReferenceDeleteType = ReqType<ReqID.deleteOne, ReferenceDeleteFilter>;
export type ReferenceFindType = ReqType<ReqID.getMany | ReqID.getOne, ReferenceFindFilter>;
export type ReferenceGetAllType = ReqType<ReqID.getAll, null>;
export type ReferenceCreateType = ReqType<ReqID.createOne, null>;

export type ReferenceResType = ResType<Reference>;
