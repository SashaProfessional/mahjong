import { Store } from "../types";

export const selectAutoClosingTimeOut = (state: Store) =>
   state.pairingData?.autoCloseTimeooutId;

export const selectPreviouslyClickedItem = (state: Store) =>
   state.field.find((item) => item.id === state.pairingData?.itemId);

export const selectField = (state: Store) => state.field;

export const selectShowAllItems = (state: Store) => state.showAllItems;
