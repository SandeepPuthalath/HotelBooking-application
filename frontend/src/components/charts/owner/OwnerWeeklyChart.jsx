import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { handleFetchingOwnerChartData } from "../../../redux/reducers/owner/chartsReducer";
import Loading from "../../auth/Loading";
import { Tooltip } from "@material-tailwind/react";

const WeeklyBookings = () => {
  const weekly = useSelector((s) => s.charts.ownerWeekly);
  return (
    <div className="flex flex-col border border-gray-300 py-5 px-5 rounded-md shadow-md bg-white gap-3">
      <div className="flex justify-center items-center">
        <h3 className="text-sm md:text-2xl font-semibold md:font-bold uppercase text-gray-900">
          Weekly Revenu
        </h3>
      </div>
      <div className="">
        <ResponsiveContainer aspect={3}>
          <BarChart data={weekly} width={730} height={250}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const WeeklyAmount = () => {
  const weekly = useSelector((s) => s.charts.ownerWeekly);

  return (
    <div className="flex flex-col border border-gray-300 py-5 px-5 rounded-md shadow-md bg-white gap-3">
      <div className="flex justify-center items-center">
        <h3 className="text-sm md:text-2xl font-semibold md:font-bold uppercase text-gray-900">
          Weekly Bookings
        </h3>
      </div>
      <div className="">
        <ResponsiveContainer aspect={3}>
          <BarChart data={weekly} width={730} height={250}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBookings" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const OwnerWeeklyChart = ({ hotelId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.charts.loading);

  React.useEffect(() => {
    dispatch(handleFetchingOwnerChartData(hotelId));
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid md:grid-cols-2 gap-2">
      <div className="md:col-span-1">
        <WeeklyBookings />
      </div>
      <div className="md:col-span-1">
        <WeeklyAmount />
      </div>
    </div>
  );
};

export default OwnerWeeklyChart;
