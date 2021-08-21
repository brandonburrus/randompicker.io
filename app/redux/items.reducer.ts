import { createReducer } from "@reduxjs/toolkit";
import { addItem, removeItem } from "./actions";
import { v4 as uuid } from "uuid";
import { Item } from "../item.interface";

export const itemsReducer = createReducer<Item[]>([], (builder) => {
  builder
    .addCase(addItem, (state, action) => {
      state.push({
        name: action.payload.name,
        id: uuid(),
      });
    })
    .addCase(removeItem, (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    });
});
