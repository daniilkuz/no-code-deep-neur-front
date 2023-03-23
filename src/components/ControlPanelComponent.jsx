import React from "react";
import ControlPanelParameter from "./ControlPanelParameter";

function ControlPanelComponent() {
  return (
    <div className="my-4 border-2 border-solid border-black rounded-lg">
      <h3 className="text-3xl font-semibold my-2">Control panel</h3>
      <div className="grid grid-cols-4 m-4 gap-3 justify-start text-left">
        <ControlPanelParameter name="Number of embeddings" />
        <ControlPanelParameter name="Batch size" />
        <ControlPanelParameter name="Number of iterations" />
        <ControlPanelParameter name="Block size" />
      </div>
    </div>
  );
}

export default ControlPanelComponent;
