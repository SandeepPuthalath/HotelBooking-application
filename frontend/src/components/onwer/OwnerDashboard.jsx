import React from "react";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaBed } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformanceDetails } from "../../redux/reducers/owner/ownerDashboardReducer";

function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "Invalid month number";
  }
}

const OwnerDashboard = ({hotelId}) => {
  const dispatch = useDispatch()
  const monthleRevenu = useSelector(s => s.ownerDashboard.monthlyRevenu)
  const yearlyRevenu = useSelector(s => s.ownerDashboard.yearlyRevenu)
  const totalBookings = useSelector(s => s.ownerDashboard.totalBookings)

  React.useEffect(() =>{
    dispatch(fetchPerformanceDetails(hotelId))
  }, [])

  return (
    <div className="min-h-screen bg-gray-200 px-10 py-10">
      <div className="flex flex-col md:flex-row justify-center gap-5 items-center">
        <div className="bg-white w-full flex flex-col px-10 py-5 justify-evenly items-center md:flex-row rounded-md shadow-md hover:shadow-xl border-1">
          <div className="flex flex-row justify-evenly gap-3">
            <div className="flex justify-center items-center">
              <HiCurrencyRupee className="text-green-700" size={50}/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-semibold">{monthleRevenu?.totalAmount}</h3>
              <p className="text-sm">Total revenue of {getMonthName(monthleRevenu?._id)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col px-10 py-5 justify-center items-center md:flex-row rounded-md shadow-md hover:shadow-xl border-1">
          <div className="flex flex-row justify-evenly gap-3">
            <div className="flex justify-center items-center">
              <HiCurrencyRupee className="text-blue-700" size={50}/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-semibold">{yearlyRevenu?.totalAmount}</h3>
              <p className="text-sm">Total yearly revenu</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col px-10 py-5 justify-center items-center md:flex-row rounded-md shadow-md hover:shadow-xl border-1">
          <div className="flex flex-row justify-evenly gap-3">
            <div className="flex justify-center items-center">
              <FaBed className="text-red-700" size={50}/>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-semibold">{totalBookings?.count}</h3>
              <p className="text-sm">Total monthly revenu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
