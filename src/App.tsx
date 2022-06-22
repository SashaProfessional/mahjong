import { useEffect } from "react";

import { generateField } from "./utils/fieldGenerator";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import {
   setField,
   updateItems,
   setPairingData,
   setShowAllItems,
} from "./redux/slice";
import {
   selectAutoClosingTimeOut,
   selectPreviouslyClickedItem,
   selectField,
   selectShowAllItems,
} from "./redux/selectors";
import { FieldData } from "./types";
import { Card } from "./components/Card";
import "./assets/styles.scss";

function App() {
   const field = useAppSelector(selectField);
   const previouslyClickedItem = useAppSelector(selectPreviouslyClickedItem);
   const autoClosingTimeOut = useAppSelector(selectAutoClosingTimeOut);
   const showAllItems = useAppSelector(selectShowAllItems);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setField(generateField()));
      setTimeout(() => dispatch(setShowAllItems(false)), 3000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const itemClicked = (id: number) => {
      const clickedItem = field.find((item) => item.id === id)!;

      if (previouslyClickedItem) {
         clearTimeout(autoClosingTimeOut);

         if (previouslyClickedItem.value === clickedItem.value) {
            setItemsStore(
               {
                  ...previouslyClickedItem,
                  isPaired: true,
                  isTemporaryOpened: false,
               },
               {
                  ...clickedItem,
                  isPaired: true,
                  isTemporaryOpened: false,
               }
            );
         } else {
            setItemsStoreWithDelay(
               {
                  ...clickedItem,
                  isTemporaryOpened: false,
               },
               {
                  ...previouslyClickedItem,
                  isTemporaryOpened: false,
               }
            );

            setItemsStore({
               ...clickedItem,
               isTemporaryOpened: true,
            });
         }
         dispatch(setPairingData(null));
      } else {
         const autoCloseId = setTimeout(() => {
            setItemsStore({
               ...clickedItem,
               isTemporaryOpened: false,
            });
            dispatch(setPairingData(null));
         }, 2000);

         setItemsStore({
            ...clickedItem,
            isTemporaryOpened: true,
         });
         dispatch(
            setPairingData({
               itemId: id,
               autoCloseTimeooutId: autoCloseId,
            })
         );
      }
   };

   const setItemsStore = (...items: FieldData[]) =>
      dispatch(updateItems([...items]));

   const setItemsStoreWithDelay = (...items: FieldData[]) =>
      setTimeout(() => setItemsStore(...items), 2000);

   const getIsDisabled = (item: FieldData) =>
      showAllItems ||
      field.filter((item) => item.isTemporaryOpened).length === 2 ||
      item.isPaired ||
      item.isTemporaryOpened;

   return (
      <>
         <h1 className="title">Mahjong-like game</h1>
         <div className="field-wrapper">
            {field.map((item) => (
               <Card
                  itemData={item}
                  itemClicked={itemClicked}
                  showAllItems={showAllItems}
                  disabled={getIsDisabled(item)}
                  key={item.id}
               />
            ))}
         </div>
      </>
   );
}

export default App;
