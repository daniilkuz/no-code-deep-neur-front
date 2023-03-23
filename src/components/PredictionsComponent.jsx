import React from "react";

function PredictionsComponent({ predictions }) {
  return (
    <>
      {predictions && (
        <div className="border-solid border-black border-2 mt-4 p-4 rounded-lg">
          <h3 className="font-bold">Predictions:</h3>
          {predictions.map((prediction, i) => {
            return (
              <div key={i}>
                <p>{prediction}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default PredictionsComponent;
