import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Context/MyContext";
import { millisToMinutesAndSeconds } from "../Utils/Session";

function UserLogoutModel() {
  const [LoginDetails] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    let SesionOutCount = 60000;
    let TimeOutInMinutes = millisToMinutesAndSeconds(SesionOutCount);
    if (LoginDetails.login) {
      toast(`your session will expire in ${TimeOutInMinutes} minutes`);
      setTimeout(() => {
        localStorage.clear();
        toast.success("Session Expired ");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, SesionOutCount);
    }
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const clickMenu = (e) => {
    if (e.target) {
      localStorage.clear();
      toast.success("Logout Successfull ");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        {LoginDetails?.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={(e) => clickMenu(e)}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default UserLogoutModel;
