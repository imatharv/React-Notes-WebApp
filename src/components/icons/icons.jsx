import "./iconsStyles.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import CropOriginalRoundedIcon from "@material-ui/icons/CropOriginalRounded";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import ColorPalletMenu from "../colorPallet/colorpallet";

export default function IconsGroup(props) {
  const handleClickColorMenu = () => {
    console.log("Clicked in icons.jsx");
    props.handleToggle();
  };

  return (
    <div className="icons-group">
      <IconButton aria-label="Remind me">
        <AddAlertOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Add colaborators">
        <PersonAddOutlinedIcon fontSize="small" />
      </IconButton>
      <div className="color-pallet-wrapper">
        <IconButton aria-label="Add colour" onClick={handleClickColorMenu}>
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>

        <ColorPalletMenu
          cpOpen={props.cpOpen}
          anchorRef={props.anchorRef}
          handleToggle={props.handleToggle}
          handleListKeyDown={props.handleListKeyDown}
          handleClose={props.handleClose}
        />
      </div>

      <IconButton aria-label="Add image">
        <CropOriginalRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Archive">
        <ArchiveOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="More">
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
