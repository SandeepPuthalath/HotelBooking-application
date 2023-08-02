import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const HotelSearch = ({ setSearch, onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setSearch(searchValue);
  };

  return (
    // <div className="flex h-full justify-center items-center py-3 shadow-xl bg-gray-900">
    //   <div className="relative flex items-center justify-center">
    //     <div className="hidden md:flex">
    //       <Input
    //         className="pl-4 border border-gray-300 w-72 focus:w-80  focus:border-gray-400 rounded-full"
    //         variant="static"
    //         value={searchValue}
    //         onChange={handleSearch}
    //         type="text"
    //         placeholder="Search something...."
    //       />
    //     </div>
    //     <div onClick={onSearch} className="absolute hidden md:flex right-0 items-center cursor-pointer">
    //         <button className="bg-gray-400 p-3 border rounded-full"> <FaSearch className="text-gray-500 w-5" /></button>
    //       {/* <FaSearch className="text-gray-500 w-5" /> */}
    //     </div>
    //     <div className="md:hidden inset-y-0 left-0 m-3 pl-2 items-center cursor-pointer">
    //       <FaSearch
    //         onClick={() => setIsSearchOpen((s) => !s)}
    //         className="text-gray-500"
    //       />
    //     </div>

    //     {isSearchOpen && (
    //       <div className=" bg-white md:hidden">
    //         <Input
    //           className="p-4 placeholder-center border border-gray-300 w-48 focus:w-64 focus:border-gray-900 rounded-full"
    //           variant="static"
    //           type="text"
    //           value={searchValue}
    //           onChange={(e) => searchValue(e.target.value)}
    //           placeholder="Search something...."
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
    <Card className="w-full max-w-[20rem] p-8 bg-gray-900">
      <CardHeader
        shadow={false}
        floated={false}
        className="bg-transparent flex justify-start items-center"
      >
        <Typography variant="h5" className="text-gray-100">
          Search
        </Typography>
      </CardHeader>
      <CardBody>
        <Input variant="outlined" label="Destination" />
      </CardBody>
    </Card>
  );
};

export default HotelSearch;
