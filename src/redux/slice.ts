import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FieldData, PairingData } from "../types";
import { INITIAL_STATE } from "../constants";

export const fieldSlice = createSlice({
   name: "field",
   initialState: INITIAL_STATE,
   reducers: {
      setField: (state, action: PayloadAction<FieldData[]>) => {
         state.field = action.payload;
      },
      updateItems: (state, action: PayloadAction<FieldData[]>) => {
         action.payload.forEach((item) => {
            const updatingItemIndex = state.field.findIndex(
               (i) => i.id === item.id
            );

            state.field.splice(updatingItemIndex, 1, item);
         });
      },
      setPairingData: (state, action: PayloadAction<PairingData | null>) => {
         state.pairingData = action.payload;
      },
      setShowAllItems: (state, action: PayloadAction<boolean>) => {
         state.showAllItems = action.payload;
      },
   },
});

export const { setField, updateItems, setPairingData, setShowAllItems } =
   fieldSlice.actions;

export default fieldSlice.reducer;
