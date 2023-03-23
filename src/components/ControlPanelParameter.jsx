import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "../store/slicers/layersSlice";

function ControlPanelParameter({ name }) {
  const dispatch = useDispatch();
  const params = useSelector((state) => state.params);
  // console.log(params[name]);
  const handleDecrement = () => {
    const newValue = Number(params[name]) - 1 > 0 ? params[name] - 1 : 1;
    dispatch(setParams({ name: name, value: newValue }));
  };
  const handleIncrement = () => {
    // console.log(1);
    // console.log(params[name]);
    const newValue = Number(params[name]) + 1;
    dispatch(setParams({ name: name, value: newValue }));
  };
  const handleChange = (event) => {
    const newValue =
      Number(event.target.value) > 0 || " " ? event.target.value : 1;
    dispatch(setParams({ name: name, value: newValue }));
  };
  return (
    <>
      <div className="pr-5 border-r-[1px] border-black">
        <p>{name}</p>
      </div>
      <div className="flex flex-row text-center">
        <div
          onClick={handleDecrement}
          className="flex flex-col hover:bg-slate-200 cursor-pointer justify-center m-0 px-0 w-5 text-center border-[1px] rounded-ld"
        >
          <p>-</p>
        </div>
        <input
          className="text-center w-20 mx-2"
          type="number"
          value={params[name]}
          onChange={handleChange}
        />
        <div
          onClick={handleIncrement}
          className="flex flex-col hover:bg-slate-200 cursor-pointer justify-center m-0 px-0 w-5  text-center border-[1px] rounded-ld"
        >
          <p>+</p>
        </div>
      </div>
    </>
  );
}

export default ControlPanelParameter;
