import { useState } from "react";
import Button from "../../../components/Button";
import useRecipe from "../hooks/useRecipe";
import IncludeButton from "./IncludeButton";

export default function SearchBar() {
  const {
    searchName,
    setSearchName,
    include,
    handleChangeInclude,
    handleAddInclude,
    renderIncludeList,
  } = useRecipe();

  return (
    <div className=" bg-primary px-appWidth py-12 flex flex-col gap-3 ">
      <div className=" flex gap-3 font-black text-2xl">
        <div className="bg-white min-w-16 flex justify-center items-center">
          <i className="fa-solid fa-magnifying-glass bg-white"></i>
        </div>
        <div className=" flex flex-col gap-3">
          <div className="flex gap-3 bg-white py-2 px-6 ">
            <div className="">NAME :</div>
            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value.toUpperCase())}
              className="flex-1 focus:outline-none"
            />
          </div>
          <div className=" flex gap-3">
            <div className=" flex flex-1 gap-3 bg-white py-2 px-6">
              <div>INCLUDE :</div>
              <input
                className="flex-1 focus:outline-none"
                value={include}
                onChange={handleChangeInclude}
              />
              <button onClick={handleAddInclude}>+</button>
            </div>
            <div className="flex flex-1 gap-3 bg-white py-2 px-6">
              <div>EXCLUDE :</div>
              <input className="flex-1 focus:outline-none" />
              <button>-</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-end w-full h-56 p-4 border-white border-l-[36px] border-r-[36px] border-b-[36px]">
        <div className="flex gap-3">{renderIncludeList}</div>
      </div>
    </div>
  );
}
