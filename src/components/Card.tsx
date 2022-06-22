import classNames from "classnames";

import { FieldData } from "../types";

type Props = {
   itemData: FieldData;
   showAllItems: boolean;
   disabled: boolean;
   itemClicked: (id: number) => void;
};

export function Card(props: Props) {
   const { itemData, itemClicked, showAllItems, disabled } = props;

   return (
      <button
         className="card"
         disabled={disabled}
         onClick={() => itemClicked(itemData.id)}
      >
         <span
            className={classNames("card-label", {
               opened:
                  itemData.isPaired ||
                  itemData.isTemporaryOpened ||
                  showAllItems,
            })}
         >
            {itemData.value}
         </span>
      </button>
   );
}
