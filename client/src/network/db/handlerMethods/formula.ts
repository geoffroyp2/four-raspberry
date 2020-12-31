import { get, post } from "@db/client";

import { store } from "@src/redux/store";
import { loadFormula } from "@redux/dataReducers/formulaSlice";

import {
  FormulaCreateType,
  FormulaDeleteType,
  FormulaFindFilter,
  FormulaFindType,
  FormulaFixType,
  FormulaGetAllType,
  FormulaLinkEditType,
  FormulaSimpleEditType,
  LinkEditID,
  ReqID,
} from "@sharedTypes/dbAPITypes";
import { Formula, FormulaItem } from "@sharedTypes/dbModelTypes";

import { deleteInStore, updateStore } from "@reduxStore/dbDataEdit";

export const formulaMethods = {
  getAll: async (): Promise<void> => {
    const request: FormulaGetAllType = {
      id: ReqID.getAll,
      data: null,
    };

    const data = await get(request, "formula");
    updateStore(data);
  },

  getMany: async (filter: FormulaFindFilter): Promise<void> => {
    const request: FormulaFindType = {
      id: ReqID.getMany,
      data: filter,
    };

    const data = await get(request, "formula");
    updateStore(data);
  },

  getOne: async (filter: FormulaFindFilter): Promise<void> => {
    const request: FormulaFindType = {
      id: ReqID.getOne,
      data: filter,
    };

    const data = await get(request, "formula");
    updateStore(data);
  },

  createOne: async (): Promise<void> => {
    const request: FormulaCreateType = {
      id: ReqID.createOne,
      data: null,
    };

    const data = await get(request, "formula");

    updateStore(data);
    // select new element
    if (data.formula) {
      store.dispatch(loadFormula(data.formula[0]));
    }
  },

  deleteOne: async (id: string): Promise<void> => {
    const request: FormulaDeleteType = {
      id: ReqID.deleteOne,
      data: id,
    };

    const data = await get(request, "formula");
    updateStore(data);
    deleteInStore(id, "formula");
  },

  updateSimple: async (formula: Formula): Promise<void> => {
    const request: FormulaSimpleEditType = {
      id: ReqID.updateSimple,
      data: {
        id: formula._id,
        filter: {
          name: formula.name,
          description: formula.description,
        },
      },
    };

    const data = await post(request, "formula");
    updateStore(data);
  },

  addChemical: async (formulaID: string, formulaItem: FormulaItem) => {
    const request: FormulaLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.addElement,
        filter: {
          formulaID: formulaID,
          formulaItem: formulaItem,
        },
      },
    };

    const data = await post(request, "formula");
    updateStore(data);
  },

  removeChemical: async (formulaID: string, chemicalID: string) => {
    const request: FormulaLinkEditType = {
      id: ReqID.updateLink,
      data: {
        id: LinkEditID.removeElement,
        filter: {
          formulaID: formulaID,
          chemicalID: chemicalID,
        },
      },
    };

    const data = await post(request, "formula");
    updateStore(data);
  },

  fixLinks: async (id: string): Promise<void> => {
    const request: FormulaFixType = {
      id: ReqID.fixLinks,
      data: id,
    };

    const data = await get(request, "formula");
    updateStore(data);
  },
};
