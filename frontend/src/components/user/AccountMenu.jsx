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
  const userData = useSelector(s => s.userProfile.data)

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            className="cursor-pointer"
            src={userData?.pic ? userData?.pic : "/defaults/blank-profile.png"}
            alt="avatar"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => navigate("profile")}>Profile</MenuItem>
          {role === "normal" && (
            <MenuItem onClick={() => navigate(`wallet/${userId}`)}>
              Wallet
            </MenuItem>
          )}
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
