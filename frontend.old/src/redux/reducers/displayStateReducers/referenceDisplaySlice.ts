import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

type ReferenceDisplayType = {
  infosEditMode: boolean;
  pointEditMode: boolean;
};

const initialState: ReferenceDisplayType = {
  infosEditMode: false,
  pointEditMode: false,
};

const referenceDisplaySlice = createSlice({
  name: "referenceDisplay",
  initialState,
  reducers: {
    setReferencePointEditMode: (state, action: PayloadAction<boolean>) => {
      state.pointEditMode = action.payload;
    },

    setReferenceInfosEditMode: (state, action: PayloadAction<boolean>) => {
      state.infosEditMode = action.payload;
    },
  },
});

export const { setReferencePointEditMode, setReferenceInfosEditMode } = referenceDisplaySlice.actions;

export const ReferencePointEditMode = (state: RootState) => state.referenceDisplay.pointEditMode;
export const ReferenceInfosEditMode = (state: RootState) => state.referenceDisplay.infosEditMode;

export default referenceDisplaySlice.reducer;
