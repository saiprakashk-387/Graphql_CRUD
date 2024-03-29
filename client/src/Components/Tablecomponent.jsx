import React, { useState, useContext } from "react";
import { debounce } from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Loader from "./Loader";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql-queries/queries";
import UserModel from "../Models/UserModel";
import UserDeleteModel from "../Models/UserDeleteModel";
import { UserContext } from "../Context/MyContext";
import InfoModel from "../Models/InfoModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import Tablepagination from "../Pagination/Tablepagination";

function Tablecomponent() {
  const [LoginDetails] = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [Edit, setEdit] = useState("");
  const [Info, setInfo] = useState("");
  const [Search, setSearch] = useState("");
  
  const { loading, data, error } = useQuery(GET_USER);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  const handleClickOpen = (val) => {
    setOpen(true);
    setEdit(val);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (item) => {
    setOpenDelete(true);
    setDeleteId(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  ////info model data ///
  const getInfo = (val) => {
    setInfo(val);
  };

//   const delaySaveToDb = useCallback(debounce((val)=>{
//     setSearch(val)
//   }
// , 2000), []);

 

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data?.users.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(data?.users.length / recordsPerPage);
  return error ? (
    "Error !"
  ) : loading ? (
    <Loader />
  ) : (
    <>
      <div style={{ width: 1200, display: "inline-block" }}>
        {currentRecords && (
          <>
            <span>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  marginLeft: "auto",
                  marginTop: 2,
                  marginBottom: 2,
                  alignItems: "center",
                  width: 200,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search with Name"
                  onChange={debounce((e) => {   ///with npn 
                    setSearch(e.target.value);
                  }, 2000)}
              
            // onChange={(e) => {   //with custom method///
            //   delaySaveToDb(e.target.value);
            // }}
                />
              </Paper>
            </span>
            <TableContainer
              component={Paper}
              style={{ width: 1200, display: "inline-block" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ backgroundColor: "violet" }}>
                  <TableRow>
                    {/* <TableCell>S.No</TableCell> */}
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">User Info</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRecords
                    ?.filter((value, i) => {
                      if (Search === !null) {
                        return value;
                      } else if (value.username.includes(Search)) {
                        return value;
                      }
                    })
                    .reverse()
                    .map((item, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {/* <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell> */}
                        <TableCell align="right">{item.username}</TableCell>
                        <TableCell align="right">{item.email}</TableCell>
                        <TableCell align="right">{item.mobile}</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => {
                              getInfo(item);
                            }}
                          >
                            <InfoModel Info={Info} />
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          {LoginDetails?.name ? (
                            <Button
                              variant="contained"
                              color="info"
                              style={{ marginLeft: 5 }}
                              startIcon={<EditIcon />}
                              onClick={() => {
                                handleClickOpen(item);
                              }}
                            >
                              Edit
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="info"
                              style={{ marginLeft: 5 }}
                              startIcon={<EditIcon />}
                              disabled
                            >
                              Edit
                            </Button>
                          )}

                          {LoginDetails?.name ? (
                            <Button
                              variant="contained"
                              color="error"
                              style={{ marginLeft: 5 }}
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                handleClickOpenDelete(item);
                              }}
                            >
                              Delete
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="error"
                              disabled
                              startIcon={<DeleteIcon />}
                              style={{ marginLeft: 5 }}
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <UserModel
              Edit={Edit}
              open={open}
              handleClose={handleClose}
              setOpen={setOpen}
              handleClickOpen={handleClickOpen}
            />
            <UserDeleteModel
              DeleteId={DeleteId}
              open={openDelete}
              handleCloseDelete={handleCloseDelete}
              setOpen={setOpenDelete}
              handleClickOpenDelete={handleClickOpenDelete}
            />
            <div style={{ marginLeft: "auto" }}>
              <Tablepagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Tablecomponent;
