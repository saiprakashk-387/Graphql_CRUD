import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql-queries/queries";

function UserModel(props) {
  const { open, handleClose, Edit } = props;
  const [updateUser, { data }] = useMutation(UPDATE_USER);

  const [Value, setValue] = useState({
    email: "",
    mobile: "",
    username: "",
    id: "",
  });
  useEffect(() => {
    setValue(Edit);
  }, [Edit]);
  const handleInput = (e) => {
    e.preventDefault();
    let myData = { ...Value };
    myData[e.target.name] = e.target.value;
    setValue(myData);
  };
  const update = (e) => {
    e.preventDefault();
    console.log("Value", Value);
    updateUser({ variables: Value })
      .then((res) => {
        toast.success("User Updated ");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setValue({ email: "", mobile: "", username: "", id: "" });
    handleClose();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            value={Value.username}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={Value.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Mobile"
            type="number"
            name="mobile"
            fullWidth
            variant="outlined"
            value={Value.mobile}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={update}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserModel;
