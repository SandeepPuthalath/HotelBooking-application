import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/auth/user/userAuthSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AccountMenu({role}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((s) => s.user?.data?.applicantId);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            className="cursor-pointer"
            src="https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="avatar"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => navigate("profile")}>Profile</MenuItem>
         {role === "normal" && <MenuItem onClick={() => navigate(`wallet/${userId}`)}>Wallet</MenuItem>}
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
