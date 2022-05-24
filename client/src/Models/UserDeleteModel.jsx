import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../graphql-queries/queries";

function UserDeleteModel(props) {
  const { DeleteId, open, handleCloseDelete } = props;
  const [deleteUser, { data }] = useMutation(DELETE_USER);

  const handleDelete = () => {
    let id = { id: DeleteId.id };
    deleteUser({ variables: id }).then((res) => {
      toast.success("User Deleted ");
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserDeleteModel;
