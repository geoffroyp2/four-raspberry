import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

interface Pending {
  data: boolean;
  name: boolean;
}

interface Edit {
  name: boolean;
}

interface RecordStateType {
  pending: Pending;
  edit: Edit;
}

const initialState: RecordStateType = {
  pending: {
    data: false,
    name: false,
  },
  edit: {
    name: false,
  },
};

export const recordStateSlice = createSlice({
  name: "recordstates",
  initialState,
  reducers: {
    setRecordPending: (state, action: PayloadAction<Partial<Pending>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Pending] = value!;
      });
    },
    setRecordEdit: (state, action: PayloadAction<Partial<Edit>>) => {
      Object.entries(action.payload).forEach((e) => {
        const [key, value] = e;
        state.pending[key as keyof Edit] = value!;
      });
    },
  },
});

export const { setRecordPending, setRecordEdit } = recordStateSlice.actions;

export const selectRecordPending = (state: RootState) => state.recordState.pending;
export const selectRecordEdit = (state: RootState) => state.recordState.pending;

export default recordStateSlice.reducer;
