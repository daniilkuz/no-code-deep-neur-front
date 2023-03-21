import React, { useState } from "react";
import {
  increaseNeurons,
  decreaseNeurons,
  setNeurons,
} from "../store/slicers/layersSlice";
import { useDispatch, useSelector } from "react-redux";

function Layer({ index }) {
  // const [neurons, setNeurons] = useState(1);
  const neurons = useSelector((state) => state.layers[index].neurons);
  const [inc, setInc] = useState(1);
  const dispatch = useDispatch();
  return (
    <div className="border-solid border-2 border-black">
      <h1 className="m-4">Layer {index + 1}</h1>
      <h3 className="mb-4">the number of neurons:</h3>
      <button
        className="mr-4"
        onClick={() =>
          increaseNeurons(
            dispatch(increaseNeurons({ index: index, value: Number(inc) }))
          )
        }
        // onClick={() => setNeurons((neurons) => Number(neurons) + Number(inc))}
      >
        +
      </button>
      <input
        className="w-12 text-center h-10"
        type="number"
        value={neurons}
        onChange={(event) =>
          dispatch(setNeurons({ index: index, value: event.target.value }))
        }
        // onChange={(event) => setNeurons(event.target.value)}
      />
      <button
        className="ml-4"
        onClick={() =>
          dispatch(decreaseNeurons({ index: index, value: Number(inc) }))
        }
        // onClick={() =>
        //   setNeurons((neurons) =>
        //     Number(neurons) > 1 && Number(neurons) - Number(inc) > 0
        //       ? Number(neurons) - Number(inc)
        //       : 1
        //   )
        // }
      >
        -
      </button>
      <p className="mt-4 mb-4">
        increase by{" "}
        <input
          className="w-10 text-center"
          type="text"
          value={inc}
          onChange={(event) => setInc(event.target.value)}
        />
      </p>
    </div>
  );
}

export default Layer;
