import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import ControlPanelComponent from "./components/ControlPanelComponent";
import ModelParametersComponent from "./components/ModelParametersComponent";
import Header from "./components/Header";
import FileUploadComponent from "./components/FileUploadComponent";
import PredictionsComponent from "./components/PredictionsComponent";
import LayersComponent from "./components/LayersComponent";

const server = import.meta.env.VITE_SERVER;

function App() {
  // const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState();
  const [modelInfo, setModelInfo] = useState(null);
  // const [modelName, setModelName] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(" - ");
  const [statusColor, setStatusColor] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem("model");
    console.log("localStorage: ", localData);
    if (localData) {
      setModelInfo(JSON.parse(localData));
    }
  }, []);

  const { layers, data, params } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePredict = () => {
    setLoading(true);
    setStatus("predicting...");
    setStatusColor(null);
    const modelName = localStorage.getItem("modelName");
    axios
      .post(server + "/predict", { data: modelName })
      .then((res) => {
        console.log(res.status);
        setStatus(res.statusText);
        if (res.status == 200) setStatusColor("text-green-600");
        return res.data;
      })
      .then((data) => {
        console.log(typeof data);
        const lines = data.split("\n");
        console.log(lines);
        setPredictions(lines);
        setLoading(false);
        // setStatus(" - ");
      })
      .catch((err) => {
        // console.error(err);
        console.error(err.response.data);
        console.error(err.message);
        localStorage.clear();
        setModelInfo(null);
        setLoading(false);
        setStatus(err.response.data);
        setStatusColor("text-red-600");
      });
  };

  return (
    <div className="App">
      <Header
        setLoading={setLoading}
        setStatus={setStatus}
        setStatusColor={setStatusColor}
        setModelInfo={setModelInfo}
        setPredictions={setPredictions}
      />
      <br />
      <ControlPanelComponent />
      <div className={`flex flex-row w-96 m-4 font-bold ${statusColor}`}>
        <h3 className="flex mr-4">status: </h3>
        <p className="flex font-green-600">{status}</p>
      </div>
      <FileUploadComponent data={data} />

      {modelInfo && modelInfo.train_loss && modelInfo.val_loss && (
        <>
          <ModelParametersComponent modelInfo={modelInfo} />
          <div className="mt-4">
            <button onClick={handlePredict}>Make prediction</button>
          </div>
        </>
      )}
      <PredictionsComponent predictions={predictions} />
      <LayersComponent layers={layers} />
    </div>
  );
}

export default App;
