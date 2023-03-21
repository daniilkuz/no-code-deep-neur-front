import { configureStore } from "@reduxjs/toolkit";
import layersReducer from "./slicers/layersSlice";

const store = configureStore({
  reducer: layersReducer,
});

export default store;
