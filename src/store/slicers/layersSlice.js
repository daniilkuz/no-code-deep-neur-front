import { createSlice } from "@reduxjs/toolkit";

export const layersSlice = createSlice({
  name: "layers",
  initialState: {
    layers: [{ neurons: 25 }, { neurons: 5 }, { neurons: 5 }],
    data: null,
  },
  reducers: {
    addLayer: (state) => {
      state.layers = [...state.layers, { neurons: 1 }];
    },
    removeLastLayer: (state) => {
      state.layers = state.layers.slice(0, state.layers.length - 1);
    },
    increaseNeurons: (state, action) => {
      state.layers[action.payload.index].neurons =
        Number(state.layers[action.payload.index].neurons) +
        action.payload.value; // += doesn't work as state.layers[action.payload.index].neurons my by string
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
    setData: (state, action) => {
      if (action.payload == null) state.data = null;
      else
        state.data = { name: action.payload.name, file: action.payload.file };
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
  setData,
  increment,
  decrement,
  incrementByAmount,
} = layersSlice.actions;

export default layersSlice.reducer;
