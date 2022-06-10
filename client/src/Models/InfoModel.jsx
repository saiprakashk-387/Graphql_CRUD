import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEM_HEIGHT = 48;

function InfoModel(props) {
  const { Info } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const copyContent = (e) => {
    navigator.clipboard
      .writeText(JSON.stringify(e))
      .then(toast("copied"), {
        transition: Flip,
      })
      
  };
  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faInfo} variant="contained" />
        </IconButton>
        {Info && (
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "25ch",
              },
            }}
          >
            <button
              style={{ marginLeft: 170 }}
              onClick={() => {
                copyContent(Info);
              }}
            >
              <ContentCopyTwoToneIcon />
            </button>
            <br />
            <MenuItem>
              <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                <li> Name:{Info.username} </li>
                <li> Mail:{Info.email} </li>
                <li> Mobile:{Info.mobile} </li>
              </ul>
            </MenuItem>
          </Menu>
        )}
      </div>
    </>
  );
}
export default InfoModel;
