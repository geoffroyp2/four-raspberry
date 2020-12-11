export enum ReqID {
  getAll,
  getMany,
  getOne,
  deleteOne,
  createOne,
  updateOne,
}

export interface ReqType<T, U> {
  id: T;
  data: U;
}
