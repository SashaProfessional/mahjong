export type FieldData = {
   id: number;
   value: number;
   isPaired: boolean;
   isTemporaryOpened: boolean;
};

export type PairingData = {
   itemId: number;
   autoCloseTimeooutId: ReturnType<typeof setTimeout>;
};

export type Store = {
   field: FieldData[];
   pairingData: null | PairingData;
   showAllItems: boolean;
};
