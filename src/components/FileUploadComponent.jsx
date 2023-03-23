import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import { setData } from "../store/slicers/layersSlice";

function FileUploadComponent({ data }) {
  const dispatch = useDispatch();
  const inputRef = useRef();

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
  return (
    <>
      {data ? (
        <div className="mt-5 p-10 border-solid border-2 border-black rounded-lg">
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
        <div className="mt-5 p-10 border-solid border-2 border-black rounded-lg">
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
    </>
  );
}

export default FileUploadComponent;
