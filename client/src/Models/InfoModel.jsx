import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
