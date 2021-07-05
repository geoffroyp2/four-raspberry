import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface Pending {
  data: boolean;
  name: boolean;
  points: boolean;
  description: boolean;
  color: boolean;
  oven: boolean;
}

interface Edit {
  name: boolean;
  points: boolean;
  description: boolean;
}

interface TargetStateType {
  pending: Pending;
  edit: Edit;
}

const initialState: TargetStateType = {
  pending: {
    data: false,
    points: false,
    name: false,
    description: false,
    color: false,
    oven: false,
  },
  edit: {
    name: false,
    description: false,
    points: false,
  },
};

export const targetStateSlice = createSlice({
  name: "targetState",
  initialState,
  reducers: {
    setTargetPending: (state, action: PayloadAction<Partial<Pending>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Pending] = value!;
      });
    },
    setTargetEdit: (state, action: PayloadAction<Partial<Edit>>) => {
      // Only one edit at a time
      Object.entries(state.edit).forEach(([key]) => {
        state.edit[key as keyof Edit] = false;
      });
      state.edit = { ...state.edit, ...action.payload };
    },
  },
});

export const { setTargetPending, setTargetEdit } = targetStateSlice.actions;

export const selectTargetPending = (state: RootState) => state.targetState.pending;
export const selectTargetEdit = (state: RootState) => state.targetState.edit;

export default targetStateSlice.reducer;
