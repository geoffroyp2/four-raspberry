export enum ReqID {
  getAll,
  getMany,
  getOne,
  deleteOne,
  createOne,
  updateSimple,
  updateLink,
  fixLinks,
}

export enum LinkEditID {
  changeLink,
  addElement,
  removeElement,
}

export interface ReqType<T, U> {
  id: T;
  data: U;
}
