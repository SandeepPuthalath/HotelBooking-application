import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { io } from "socket.io-client";
import { Configs } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { viewAllHotels } from "../redux/reducers/hotel/hotelThunk";
import {
  addNewMesssage,
  handleFetchingMessages,
} from "../redux/reducers/chats/userChatReducer";
import { AiOutlineClose } from "react-icons/ai";

const Chats = ({ socket, _id, name }) => {
  return (
    <div className=" flex items-center px-2 py-1 border border-gray-50 shadow-sm hover:bg-gray-200">
      <div className="px-2 py-2">
        <BsPersonCircle className="text-gray-700" size={38} />
      </div>
      <div className="w-full flex flex-col">
        <div className="2-full flex justify-between items-center-center">
          <h3 className="text-gray-900 font-semibold text-md">{name}</h3>
        </div>
        <p className="text-xs">This is the last message</p>
      </div>
    </div>
  );
};

const Messages = ({ socket, message }) => {
  const you = useSelector((s) => s.user?.data?.applicantId);

  return (
    <div
      className={`w-full flex ${
        message?.sender === you ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`${
          message?.sender === you
            ? "bg-gray-900 text-gray-50"
            : "bg-gray-50 text-gray-900"
        } px-5 py-2 rounded-md`}
      >
        <span
          className={`text-sm font-semibold ${
            message?.sender === you ? "text-green-400" : " text-blue-400"
          } capitalize`}
        >
          {message?.sender === you
            ? "you"
            : message?.user?.firstName.concat(message?.user?.lastName)}
        </span>
        <p className="text-sm ">{message?.message}</p>
      </div>
    </div>
  );
};

const HelpDesk = () => {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.user?.data?.token);
  const applicantId = useSelector((s) => s.user?.data?.applicantId);
  const hotels = useSelector((s) => s.hotels?.data);
  const messages = useSelector((s) => s.userChat.messages);
  const [hotelId, setHotelId] = React.useState("");
  const [newMessage, setNewMessage] = React.useState("");
  const scrollableDivRef = React.useRef(null);
  const socket = io(Configs.SERVER_URL, {
    query: { token },
  });

  const handleConnectToChat = (id) => {
    socket.emit("join_help_desk", id);
    socket.on("receive_message", (data) => {
      console.log({ data });
      dispatch(addNewMesssage(data));
    });
    setHotelId(id);
    dispatch(handleFetchingMessages(id));
  };

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  };

  const handleCloseChat = () => {
    socket.off("join_help_desk");
     socket.off("receive_message");
    setHotelId("");
  };

  const handleSendMessage = () => {
    console.log("sending message");
    if (newMessage) {
      const messageData = {
        hotelId: hotelId,
        message: newMessage,
        sender: applicantId,
      };
      socket.emit("send_message", messageData);
      setNewMessage("");
    }
  };

  React.useEffect(() => {
    dispatch(viewAllHotels());
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="">
      <div className="md:grid grid-cols-6">
        <div className="md:col-span-2 flex flex-col max-h-96 overflow-y-auto">
          {hotels.map((hotel) => (
            <div
              key={hotel?._id}
              className="cursor-pointer"
              onClick={() => handleConnectToChat(hotel?._id)}
            >
              <Chats {...hotel} socket={socket} />
            </div>
          ))}
        </div>
        <div className="md:col-span-4 ">
          <div className="w-full relative">
           { hotelId && <div onClick={handleCloseChat} className="absolute right-0 px-6 py-3 cursor-pointer rounded-full">
            <AiOutlineClose className="text-red-600 shadow-lg border bg-gray-500 border-gray-500 rounded-full p-1" size={30}/>
            </div>}
          </div>
          <div
            ref={scrollableDivRef}
            className="bg-gray-600 w-full max-h-[21rem] min-h-[21rem] flex flex-col gap-5 overflow-y-auto px-10 py-10"
          >
            {hotelId &&
              messages &&
              messages.map((message) => (
                <Messages
                  key={message?._id}
                  socket={socket}
                  message={message}
                />
              ))}
          </div>
          <div className="border-t border-gray-200 flex justify-center items-center gap-5 w-full px-5 py-2">
            <input
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              type="text"
              className="w-full py-2 px-2 bg-transparent border-b-2 border-gray-500 focus::border-none"
              placeholder="Type somthing here ...."
            />
            <button
              onClick={handleSendMessage}
              className="bg-gray-900 px-4 py-1 rounded-md text-sm font-bold border-2 border-gray-900 hover:bg-gray-100 hover:text-gray-900 text-gray-50 "
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
