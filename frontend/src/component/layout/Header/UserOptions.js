import React, { Fragment, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  function orders() {
    navigate("/orders");
    setOpen(false);
  }
  function profile() {
    navigate("/account");
    setOpen(false);
  }
  function logOut() {
    dispatch(logout());
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function cart() {
    navigate("/cart");
  }

  const action = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: profile,
    },
    {
      icon: <ShoppingCartIcon />,
      name: "Cart",
      func: cart,
    },
    {
      icon: <ExitToAppIcon />,
      name: "LogOut",
      func: logOut,
    },
  ];

  if (user.role === "admin") {
    action.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar[0].url ? user.avatar[0].url : "/Profile.png"}
            alt={user.name}
          />
        }
        ariaLabel="SpeedDial User Options"
      >
        {action.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
