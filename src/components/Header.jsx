import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addLayer, removeLastLayer } from "../store/slicers/layersSlice";

const server = import.meta.env.VITE_SERVER;

function Header({
  setLoading,
  setStatus,
  setStatusColor,
  setModelInfo,
  setPredictions,
}) {
  const { layers, data, params } = useSelector((state) => state);
  const dispatch = useDispatch();
  const createLayer = () => {
    dispatch(addLayer());
  };
  const removeLayer = () => {
    dispatch(removeLastLayer());
  };

  const handleTrain = () => {
    console.log({ layers, data, params });
    setLoading(true);
    setStatus("training...");
    setStatusColor(null);
    axios
      .post(server, { layers, data, params })
      .then((res) => {
        console.log(res.status);
        setStatus(res.statusText);
        if (res.status == 200) setStatusColor("text-green-600");
        return res.data;
      })
      .then((data) => {
        console.log(data);
        console.log(data.val_loss);
        console.log(data.neurons_per_layer);
        setModelInfo(data);
        localStorage.setItem("model", JSON.stringify(data));
        localStorage.setItem("modelName", data.name);
        setLoading(false);
        // setStatus(" - ");
      })
      .catch((err) => {
        // console.error(err);
        console.error(err.response.data);
        setLoading(false);
        setStatus(err.response.data);
        setStatusColor("text-red-600");
      });
  };

  return (
    <>
      <h1>Neural Network Builder</h1>
      <button
        className="mt-12 mr-5"
        onClick={() => {
          localStorage.clear();
          setModelInfo(null);
          setPredictions(null);
        }}
      >
        Clear space
      </button>
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
    </>
  );
}

export default Header;
