import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";

function UserLoginModel(props) {
  const { open, handleClose } = props;
  const initialValues = {
    username: "",
    email: "",
    // password: "",
    // mobile: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      //   mobile: yup.number().required("Phone Number is required"),
      //   password: yup.number().required("password is required"),
    }),
    onSubmit: async (values) => {
      if (values) {
        localStorage.setItem("name", values.username);
        localStorage.setItem("email", values.email);
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            helperText={formik.touched.username ? formik.errors.username : null}
            error={formik.touched.username ? formik.errors.username : null}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email ? formik.errors.email : null}
            error={formik.touched.email ? formik.errors.email : null}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserLoginModel;

//   {/* <TextField
//             autoFocus
//             margin="dense"
//             label="Mobile"
//             type="text"
//             name="mobile"
//             fullWidth
//             variant="outlined"
//             value={formik.values.mobile}
//             onChange={formik.handleChange}
//             helperText={formik.touched.mobile ? formik.errors.mobile : null}
//             error={formik.touched.mobile ? formik.errors.mobile : null}
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Password"
//             type="text"
//             name="password"
//             fullWidth
//             variant="outlined"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             helperText={formik.touched.password ? formik.errors.password : null}
//             error={formik.touched.password ? formik.errors.password : null}
//           /> */}
