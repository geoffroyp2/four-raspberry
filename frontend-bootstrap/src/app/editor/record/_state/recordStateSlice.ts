import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

interface Pending {
  data: boolean;
  name: boolean;
  points: boolean;
  description: boolean;
  color: boolean;
}

interface Edit {
  name: boolean;
  points: boolean;
  description: boolean;
}

interface RecordStateType {
  pending: Pending;
  edit: Edit;
}

const initialState: RecordStateType = {
  pending: {
    data: false,
    points: false,
    name: false,
    description: false,
    color: false,
  },
  edit: {
    name: false,
    description: false,
    points: false,
  },
};

export const recordStateSlice = createSlice({
  name: "recordState",
  initialState,
  reducers: {
    setRecordPending: (state, action: PayloadAction<Partial<Pending>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Pending] = value!;
      });
    },
    setRecordEdit: (state, action: PayloadAction<Partial<Edit>>) => {
      // Only one edit at a time
      Object.entries(state.edit).forEach(([key]) => {
        state.edit[key as keyof Edit] = false;
      });
      state.edit = { ...state.edit, ...action.payload };
    },
  },
});

export const { setRecordPending, setRecordEdit } = recordStateSlice.actions;

export const selectRecordPending = (state: RootState) => state.recordState.pending;
export const selectRecordEdit = (state: RootState) => state.recordState.edit;

export default recordStateSlice.reducer;
