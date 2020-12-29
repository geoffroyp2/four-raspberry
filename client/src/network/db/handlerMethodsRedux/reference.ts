// import { store } from "@src/redux/store";
// import { updateRecord, updateReference } from "@redux/dataReducers/dbDataSlice";

// import {
//   ReqID,
//   ReferenceFindType,
//   ReferenceFindFilter,
//   ReferenceGetAllType,
//   ReferenceCreateType,
//   ReferenceDeleteType,
//   ReferenceEditType,
//   RecordEditType,
// } from "@sharedTypes/dbAPITypes";
// import { Record, Reference } from "@sharedTypes/dbModelTypes";

// import { get, post } from "../client";

export const referenceMethods = {};
//   getAll: async (): Promise<void> => {
//     const req: ReferenceGetAllType = {
//       id: ReqID.getAll,
//       data: null,
//     };
//     const data = await get<Reference>(req, "reference");
//     data.forEach((x) => store.dispatch(updateReference(x)));
//   },

//   getMany: async (filter: ReferenceFindFilter): Promise<void> => {
//     const req: ReferenceFindType = {
//       id: ReqID.getMany,
//       data: filter,
//     };
//     const data = await get<Reference>(req, "reference");
//     data.forEach((x) => store.dispatch(updateReference(x)));
//   },

//   getOne: async (filter: ReferenceFindFilter): Promise<void> => {
//     const req: ReferenceFindType = {
//       id: ReqID.getOne,
//       data: filter,
//     };
//     const data = await get<Reference>(req, "reference");
//     store.dispatch(updateReference(data[0]));
//   },

//   createOne: async (): Promise<void> => {
//     const req: ReferenceCreateType = {
//       id: ReqID.createOne,
//       data: null,
//     };
//     const data = await get<Reference>(req, "reference");
//     store.dispatch(updateReference(data[0]));
//   },

//   deleteOne: async (id: string): Promise<void> => {
//     const { record, reference } = store.getState().dbData;

//     // unlink Records
//     const updatedRecords = await Promise.all(
//       reference[id].records.map(async (recordID) => {
//         const req: RecordEditType = {
//           id: ReqID.updateOne,
//           data: {
//             id: recordID,
//             filter: { reference: "" },
//           },
//         };
//         return await get<Record>(req, "record").then((data) => data[0]);
//       })
//     );
//     updatedRecords.forEach((r) => {
//       store.dispatch(updateRecord(r));
//     });

//     // delete reference
//     const req: ReferenceDeleteType = {
//       id: ReqID.deleteOne,
//       data: {
//         _id: id,
//       },
//     };
//     return get<Reference>(req, "reference").then();
//   },

//   updateOne: async (reference: Reference): Promise<Reference> => {
//     const req: ReferenceEditType = {
//       id: ReqID.updateOne,
//       data: {
//         id: reference._id,
//         filter: { ...reference },
//       },
//     };
//     return post<Reference>(req, "reference").then((data) => data[0]);
//   },
// };
