import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function UserLogoutModel() {
  const [LoginDetails, setLoginDetails] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      setTimeout(() => {
        window.location.reload();
      }, 200);
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
