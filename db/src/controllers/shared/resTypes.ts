export enum ResID {
  error,
  success,
}

export interface ResType<T> {
  id: ResID;
  data: T[]; // T is Record, Reference, Piece or Formula
}
