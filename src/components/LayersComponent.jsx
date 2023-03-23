import React from "react";
import Layer from "./Layer";

function LayersComponent({ layers }) {
  return (
    <div className="layers mt-4">
      {layers.map((layer, i) => {
        return (
          <div key={i} className="mt-4">
            <Layer index={i} />
          </div>
        );
      })}
    </div>
  );
}

export default LayersComponent;
