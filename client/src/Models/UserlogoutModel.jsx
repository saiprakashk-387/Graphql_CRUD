import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast, Slide, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Context/MyContext";
import { millisToMinutesAndSeconds } from "../Utils/Session";

function UserLogoutModel() {
  const [LoginDetails] = useContext(UserContext);
  const [SesionExtend, setSesionExtend] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const SesionOutCount = SesionExtend ? SesionExtend * 60000 : 60000;
  const TimeOutInMinutes = millisToMinutesAndSeconds(SesionOutCount);

  useEffect(() => {
    if (LoginDetails.login) {
      toast(toastContent(), {
        transition: Slide,
      });
      let timeValue = setTimeout(
        () => {
          localStorage.clear();
          toast.success("Session Expired ", {
            transition: Zoom,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        SesionOutCount,
        {
          transition: Slide,
        }
      );
      return () => {
        clearTimeout(timeValue);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SesionOutCount]);
  const toastContent = () => {
    const extendSession = (e) => {
      setSesionExtend(e.target.value);
    };
    return (
      <>
        <p>{`your session will expire in ${TimeOutInMinutes} minutes`}</p>
        <Button
          variant="contained"
          color="success"
          value="2"
          onClick={(e) => {
            extendSession(e);
          }}
        >
          Stay
        </Button>
      </>
    );
  };
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
      toast.success("Logout Successfull ", {
        transition: Flip,
      });
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
