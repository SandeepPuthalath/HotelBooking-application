import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({url}) => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-9xl font-extrabold">Oops!</h2>
        <h5 className="uppercase font-semibold text-lg">
          404 - page not found
        </h5>
        <p className="w-96 text-center">
          The page you are been looking for might have been removed had its name
          changed or is temporarily unavailable
        </p>
        <button onClick={() => navigate(url)} className="uppercase border-2 border-gray-900 hover:bg-white hover:text-gray-900 bg-gray-900 px-5 py-1 rounded-xl font-semibold text-gray-50">Go to homepage</button>
      </div>
    </div>
  );
};

export default ErrorPage;
