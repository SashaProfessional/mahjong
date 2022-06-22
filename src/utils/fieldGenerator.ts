import { random, range } from "lodash";

import { FieldData } from "../types";
import { FIELD_ITEMS_COUNT } from "../constants";

export const generateField = (): FieldData[] =>
   getValues().map((value, i) => {
      return {
         id: i,
         isPaired: false,
         isTemporaryOpened: false,
         value,
      };
   });

const getValues = () => {
   const possibleValues = range(1, 50).filter(isPrime);

   while (possibleValues.length > FIELD_ITEMS_COUNT / 2) {
      const removingIndex = random(0, possibleValues.length - 1);

      possibleValues.splice(removingIndex, 1);
   }

   return possibleValues.concat(possibleValues).sort(() => random(-1, 1));
};

const isPrime = (number: number) =>
   number > 2
      ? range(2, number).every((divisor) => number % divisor !== 0)
      : true;
