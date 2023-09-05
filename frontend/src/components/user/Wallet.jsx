import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAddingMoneyToWallet, handleFetchingUserWallet } from "../../redux/reducers/wallet/walletReducer";
import Loading from "../auth/Loading";
import { toast } from "react-toastify";

const Wallet = () => {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.user?.data?.applicantId);
  const loading = useSelector(s => s.userWallet.loading);
  const wallet = useSelector(s => s.userWallet.wallet);
  const transactions = useSelector(s => s.userWallet.transactions)
  const [amount, setAmount] = React.useState(0);
  const handleChange = (event) => {
    console.log(event.target.value);
    setAmount(event.target.value);
    console.log(amount);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(amount);
    dispatch(handleAddingMoneyToWallet({ userId, amount })).then(() =>{
        toast.success("Add money to wallet")
        setAmount(0)
    })
  };

  React.useEffect(() =>{
    dispatch(handleFetchingUserWallet({userId}));
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
    <div className="px-5 py-5">
      <div className="w-full grid md:grid-cols-5 gap-2">
        <div className="md:col-span-2">
          <div className="flex flex-col bg-gray-200 rounded-md px-6 py-3 shadow-md">
            <div className="flex justify-start items-center py-2 px-2 border-b-2 border-gray-300">
              <h3 className="text-xl font-bold uppercase text-gray-800">
                Wallet
              </h3>
            </div>
            <div
              className={`flex flex-col ${
                wallet?.balance ? "text-green-800" : "text-red-800"
              }  justify-cetner items-start font-bold py-4 border-b-2 border-gray-300`}
            >
              <h5 className="text-sm mx-1 capitalize">balance </h5>
              <h5 className="text-5xl">
                {wallet?.balance ? wallet?.balance : "0"} ₹
              </h5>
            </div>
            <div className="">
              <div className="pt-2 pb-4">
                <h5 className="capitalize font-semibold text-gray-800">
                  topup wallet
                </h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <input
                    value={amount > 0 ? amount : ""}
                    onChange={handleChange}
                    placeholder="Enter amount here"
                    type="number"
                    className="px-3 py-2 text-2xl placeholder:text-2xl placeholder:text-gray-500 border-2 border-gray-500 rounded-md"
                  />
                  <button
                    type="submit"
                    disabled={amount <= 0}
                    className={`${
                      amount
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-600 text-gray-300"
                    } rounded-full uppercase py-3 text-xl  font-bold`}
                  >
                    proceed to topup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className=" bg-gray-200 rounded-md px-3 py-3">
            <table className="w-full text-sm text-left ">
              <thead>
                <tr className="uppercase text-sm border-b-2 border-gray-300 text-gray-900">
                  <th scope="col">date</th>
                  <th>transaction Id</th>
                  <th>amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction) => {
                  return (
                    <tr key={transaction?._id} className="">
                      <td className="text-xs py-2">
                        {transaction?.createdAt.split("T")[0].toString()}
                      </td>
                      <td className="text-xs py-2">{transaction?._id}</td>
                      <td className="tx-sm py-2 font-semibold text-green-600">
                        +{transaction?.amount}₹
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
            className="py-1">for pagination</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
