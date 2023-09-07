import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchingDashboardData } from "../redux/reducers/admin/adminDashbord";
import { BsPersonCircle } from "react-icons/bs";
import {FaBed, FaHotel, FaRupeeSign} from "react-icons/fa"
import { Link } from "react-router-dom";
import Loading from "../components/auth/Loading";


const DashboardCard = ({value, icon, desc, color}) =>{
  return (
    <div className="px-5 py-2 bg-white rounded-md shadow-md">
      <div className="flex justify-center items-center gap-5">
        <div className={`${color} flex justify-center items-center`}>
          {icon === "USER" && <BsPersonCircle size={40} />}
          {icon === "BOOKING" && <FaBed size={40} />}
          {icon === "HOTEL" && <FaHotel size={40} />}
          {icon === "MONEY" && <FaRupeeSign size={40} />}
        </div>
        <div className="text-center text-gray-900">
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-xs">{desc}</p>
        </div>
      </div>
    </div>
  );
}


const UserCard = ({firstName, lastName, email, pic, role}) => {
  return (
    <div className="min-w-[15rem] hover:bg-blue-gray-200 hover:shadow-lg bg-blue-gray-50 rounded-md shadow-md">
      <div className="py-5 flex justify-center items-center ">
        <div className="">
          <img
            className="w-36 h-36 rounded-full border-2 border-gray-300"
            src={pic? pic :"/defaults/blank-profile.png"}
            alt="Extra large avatar"
          />
        </div>
      </div>
      <div className="text-center pb-5 text-gray-900">
        <h3 className="text-xl capitalize font-semibold">{firstName?.concat(" ",lastName)}</h3>
        <p>{email}</p>
        <p className={`uppercase font-bold ${role === "business"? "text-red-500": "text-green-500"}`}>{role}</p>
      </div>
    </div>
  );
}

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector(s => s?.AdminDashboard?.loading)
  const { totalUsers, totalHotels, totalRevenu, totalBookings, newUsers } = useSelector((s) => s.adminDashboard);
  
  React.useEffect(() => {
    dispatch(handleFetchingDashboardData())
  }, []);

  if(loading){
    return <Loading/>
  }

  return (
    <div className="px-2 py-2">
      <div className="grid gap-2">
        <div className="grid md:grid-cols-3 gap-2">
          <DashboardCard
            value={totalUsers}
            icon="USER"
            desc="Total number of users"
            color={"text-blue-500"}
          />
          <DashboardCard
            value={totalBookings}
            icon="BOOKING"
            desc="Total number of bookings"
            color={"text-red-500"}
          />
          <DashboardCard
            value={totalHotels}
            icon="HOTEL"
            desc="Total number of hotels"
            color={"text-gray-800"}
          />
        </div>
        <div>
          <DashboardCard
            value={totalRevenu}
            icon="MONEY"
            desc="Total number of revenu"
            color={"text-green-500"}
          />
        </div>
        <div className="px-2 mt-5">
          <h1 className="text-2xl font-semibold">New Users</h1>
        </div>
        <div className="w-full relative overflow-x-auto no-scrollbar flex gap-3 px-3 py-3 mb-20 bg-white rounded-md">
          {newUsers?.map((user) => (
            <Link key={user?._id} to={`/admin/user/${user?._id}`}>
              <UserCard {...user} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
