import { createSlice } from "@reduxjs/toolkit";

export const layersSlice = createSlice({
  name: "layers",
  initialState: { layers: [{ neurons: 25 }, { neurons: 5 }, { neurons: 5 }] },
  reducers: {
    addLayer: (state) => {
      state.layers = [...state.layers, { neurons: 1 }];
    },
    removeLastLayer: (state) => {
      state.layers = state.layers.slice(0, state.layers.length - 1);
    },
    increaseNeurons: (state, action) => {
      state.layers[action.payload.index].neurons += action.payload.value;
    },
    decreaseNeurons: (state, action) => {
      state.layers[action.payload.index].neurons -= action.payload.value;
      if (state.layers[action.payload.index].neurons < 1)
        state.layers[action.payload.index].neurons = 1;
    },
    setNeurons: (state, action) => {
      state.layers[action.payload.index].neurons =
        action.payload.value > 0 || action.payload.value == ""
          ? action.payload.value
          : 1;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  addLayer,
  removeLastLayer,
  increaseNeurons,
  decreaseNeurons,
  setNeurons,
  increment,
  decrement,
  incrementByAmount,
} = layersSlice.actions;

export default layersSlice.reducer;
