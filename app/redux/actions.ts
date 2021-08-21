import { createAction } from "@reduxjs/toolkit";

export const addItem = createAction<{ name: string }>("items/ADD_ITEM");
export const removeItem = createAction<{ id: string }>("items/REMOVE_ITEM");
