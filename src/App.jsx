import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  addLayer,
  removeLastLayer,
  setData,
} from "./store/slicers/layersSlice";

import Layer from "./components/Layer";
const server = import.meta.env.VITE_SERVER;

function App() {
  // const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState();
  const inputRef = useRef();
  const { layers, data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const createLayer = () => {
    dispatch(addLayer());
  };
  const removeLayer = () => {
    dispatch(removeLastLayer());
  };

  const handleFileChange = (event) => {
    if (event && event.target && event.target.files) {
      const f = event.target.files[0];
      const fileName = f.name;
      console.log("df ", f);
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target) {
          const data = event.target.result;
          console.log("event.target.result: ", data);
          dispatch(setData({ name: fileName, file: data }));
          // setFile(data);
          // setFileName(fileName);
        } else {
          console.error("couldn't process");
        }
      };
      reader.readAsDataURL(f);
      // console.log("file: ", file);
    } else {
      console.error("couldn't process");
    }
  };
  const handleTrain = () => {
    console.log({ layers, data });
    axios
      .post(server, { layers, data })
      .then((res) => res.data)
      .then((data) => console.log(data))
      .catch((err) => {
        // console.error(err);
        console.error(err.response.data);
      });
  };

  return (
    <div className="App">
      <h1>Neural Network Builder</h1>
      <button
        className="mt-12 mr-5"
        onClick={createLayer}
        // onClick={createLayer}
      >
        Create a new layer
      </button>
      <button
        className="mt-12 mr-5"
        onClick={removeLayer}
        // onClick={() => setLayers((layer) => layer.slice(0, layer.length - 1))}
      >
        Remove the last layer
      </button>
      <button className="mt-12 mr-5" onClick={handleTrain}>
        Train
      </button>
      <br />
      {data ? (
        <div className="mt-5 p-10 border-solid border-2 border-black">
          {data.name}
          <div className="flex flex-row justify-center">
            <p
              className="underline mr-2 cursor-pointer"
              onClick={() => {
                inputRef.current && inputRef.current.click();
              }}
            >
              change
            </p>
            <p
              className="underline ml-2 cursor-pointer"
              onClick={() => {
                dispatch(setData(null));
                inputRef.current.value = null;
              }}
            >
              remove
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 p-10 border-solid border-2 border-black">
          Choose
          <p
            className="underline cursor-pointer"
            onClick={() => {
              inputRef.current && inputRef.current.click();
            }}
          >
            File
          </p>
        </div>
      )}
      {/* <form> */}
      <input
        ref={inputRef}
        className="mt-5"
        type="file"
        onChange={handleFileChange}
        hidden
      />
      {/* </form> */}
      <div className="layers mt-4">
        {layers.map((layer, i) => {
          return (
            <div key={i} className="mt-4">
              <Layer index={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
