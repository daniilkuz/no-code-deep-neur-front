import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { addLayer, removeLastLayer } from "./store/slicers/layersSlice";

import Layer from "./components/Layer";

function App() {
  // const [layers, setLayers] = useState([]);
  // const createLayer = () => {
  //   setLayers((layer) =>
  //     layer.length == 0
  //       ? [...layer, [1]]
  //       : [...layer, [layer[layer.length - 1].length]]
  //   );
  // };
  // const layers = useSelector((state) => state.layers);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState();
  const inputRef = useRef();
  const layers = useSelector((state) => state.layers);
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
      // console.log(f);
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target) {
          const data = event.target.result;
          // console.log("event.target.result: ", data);
          setFile(data);
          setFileName(fileName);
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
      <br />
      {file ? (
        <div className="mt-5 p-10 border-solid border-2 border-black">
          {fileName}
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
                setFile(null);
                setFileName(null);
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
      <form>
        <input
          ref={inputRef}
          className="mt-5"
          type="file"
          onChange={handleFileChange}
          hidden
        />
      </form>
      <div className="layers mt-12">
        {layers.map((layer, i) => {
          return (
            <div className="mt-4">
              <Layer index={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
