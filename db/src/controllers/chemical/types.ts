import { Chemical } from "../../models/chemical/types";
import { ReqID, ReqType } from "../shared/reqTypes";
import { ResType } from "../shared/resTypes";

export interface ChemicalEditFilter {
  id: string;
  filter: {
    name?: string;
    chemicalName?: string;
    mass?: number;
  };
}

export interface ChemicalDeleteFilter {
  _id: string;
}

export interface ChemicalFindFilter {
  _id?: string;
}

export type ChemicalEditType = ReqType<ReqID.updateOne, ChemicalEditFilter>;
export type ChemicalDeleteType = ReqType<ReqID.deleteOne, ChemicalDeleteFilter>;
export type ChemicalFindType = ReqType<ReqID.getMany | ReqID.getOne, ChemicalFindFilter>;
export type ChemicalGetAllType = ReqType<ReqID.getAll, null>;
export type ChemicalCreateType = ReqType<ReqID.createOne, null>;

export type ChemicalResType = ResType<Chemical>;