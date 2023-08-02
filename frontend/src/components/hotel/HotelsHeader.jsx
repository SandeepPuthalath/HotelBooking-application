import React from "react";
import HotelSearch from "../searchBar/HotelSearch";

const HotelsHeader = () => {
  return (
    <div className="bg-blue-gray-500relative">
      <header className="flex p-2">
        <HotelSearch />
      </header>
    </div>
  );
};

export default HotelsHeader;
