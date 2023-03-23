import React from "react";

function ModelParametersComponent({ modelInfo }) {
  return (
    <div className="border-black border-2 border-solid pl-20 py-4 mt-4 rounded-lg">
      <h3 className="text-3xl font-semibold my-2 text-left ml-60">
        Model Parameters
      </h3>
      <div className="text-left">
        {/* {params.map((param) => {
          const line =
            param + "-".repeat(100 - param.length) + modelInfo.n_embd;
          return <p>{line}</p>;
        })} */}
        <p>
          Number of
          embeddings------------------------------------------------------------
          {modelInfo.n_embd}
        </p>
        <p>
          Batch
          size----------------------------------------------------------------------------
          {modelInfo.batch_size}
        </p>
        <p>
          Block
          size-----------------------------------------------------------------------------
          {modelInfo.block_size}
        </p>
        <p>
          Number of
          iterations----------------------------------------------------------------
          {modelInfo.max_steps}
        </p>
      </div>
      <h3 className="text-3xl font-semibold my-4 text-left ml-60">
        The Network Structure
      </h3>
      <div className="flex flex-row flex-wrap my-4 w-[90%] justify-center">
        <div className="flex flex-row justify-center items-center my-2">
          <div className="flex rounded-full border-2 border-solid border-black w-16 h-16 justify-center items-center">
            <p className="m-0 p-0">in</p>
          </div>
          <p className="ml-3 font-bold mr-3">{"->"}</p>
        </div>
        {modelInfo.neurons_per_layer.map((neuron, i) => {
          return (
            <div
              key={i}
              className="flex flex-row justify-center items-center my-2"
            >
              <div className="flex rounded-full border-2 border-solid border-black w-16 h-16 justify-center items-center">
                <p className="m-0 p-0">{neuron}</p>
              </div>
              <p className="ml-3 font-bold mr-3">{"->"}</p>
            </div>
          );
        })}
        <div className="flex flex-row justify-center items-center my-2">
          <div className="flex rounded-full border-2 border-solid border-black w-16 h-16 justify-center items-center">
            <p className="m-0 p-0">out</p>
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-semibold my-2 text-left ml-60">Results</h3>
      <div className="text-left">
        <p>
          Train Loss----------------------------------------------------------
          {modelInfo.train_loss.toFixed(4)}
        </p>
        <p>
          Validatoin Loss-----------------------------------------------------
          {modelInfo.val_loss.toFixed(4)}
        </p>
      </div>
    </div>
  );
}

export default ModelParametersComponent;
