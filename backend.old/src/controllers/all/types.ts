import { ReqID, ReqType } from "../shared/reqTypes";

export type AllGetAllType = ReqType<ReqID.getAll, null>;
export type AllFixType = ReqType<ReqID.fixLinks, null>;
