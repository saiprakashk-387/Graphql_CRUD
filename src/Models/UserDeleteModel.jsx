import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DELETE_USER } from "../graphql-queries/queries";
import { useMutation } from "@apollo/client";

function UserDeleteModel(props) {
  const { DeleteId, open, handleCloseDelete } = props;
  const [deleteUser, { data }] = useMutation(DELETE_USER);
  useEffect(() => {
    if (data) {
      window.location.reload();
    }
  }, [data]);

  const handleDelete = () => {
    let id = { id: DeleteId.id };
    deleteUser({ variables: id });
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
