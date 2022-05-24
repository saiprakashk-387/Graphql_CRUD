import React, { useState ,useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddUserModel from "../Models/AddUserModel";
import UserLoginModel from "../Models/UserLoginModel";
import UserLogoutModel from "../Models/UserlogoutModel";
import {UserContext} from '../Context/MyContext';

function Header() {
  const [LoginDetails] = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [openLoginModel, setOpenLoginModel] = React.useState(false);
  const [Edit, setEdit] = useState("");
  ///// open AddUserModel ////// create user//
  const handleClickOpen = (val) => {
    setOpen(true);
    setEdit(val);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getModel = () => {
    setOpen(true);
  };
  ////////////openlogin model ////
  const getLoginModel = () => {
    setOpenLoginModel(true);
  };
  const handleCloseLoginModel = () => {
    setOpenLoginModel(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ width: 1200, display: "inline-block" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          {LoginDetails?.name ? (
            <Button color="inherit" onClick={getModel}>
              ADD
            </Button>
          ) :  <Button disabled color="inherit" >
          ADD
        </Button>}

          <Typography
            variant="h6"
            component="div"
            style={{ marginRight: "auto", margin: "auto" }}
          >
            Graphql Crud
          </Typography>
          {LoginDetails?.name ? (
            <UserLogoutModel />
          ) : (
            <Button color="inherit" onClick={getLoginModel}>
              Login for CRUD 
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AddUserModel
        open={open}
        setOpen={setOpen}
        Edit={Edit}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <UserLoginModel
        open={openLoginModel}
        handleClose={handleCloseLoginModel}
      />
    </Box>
  );
}
export default Header;
