import { get } from "@db/client";
import { AllGetAllType, AllFixType, ReqID } from "@sharedTypes/dbAPITypes";

import { updateStore } from "@reduxStore/dbDataEdit";

export const allMethods = {
  getAll: async () => {
    const request: AllGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "all");
    updateStore(data);
  },

  fixLinks: async (): Promise<void> => {
    const request: AllFixType = {
      id: ReqID.fixLinks,
      data: null,
    };

    const data = await get(request, "all");
    updateStore(data);
  },
};
