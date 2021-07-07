import "./iconsStyles.scss";

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import CropOriginalRoundedIcon from "@material-ui/icons/CropOriginalRounded";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import RedoRoundedIcon from "@material-ui/icons/RedoRounded";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";

export default function IconsGroup() {
  return (
    <div className="icons-group">
      <IconButton aria-label="Remind me">
        <AddAlertOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Add colaborators">
        <PersonAddOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Add colour">
        <PaletteOutlinedIcon fontSize="small" />
      </IconButton>
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
