import "./iconsStyles.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import CropOriginalRoundedIcon from "@material-ui/icons/CropOriginalRounded";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import RestoreFromTrashRoundedIcon from "@material-ui/icons/RestoreFromTrashRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import ColorPalletMenu from "../colorPallet/colorpallet";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import NoteService from "../../services/noteService";

const Service = new NoteService();

export default function IconsGroup(props) {
  const [cpOpen, setCpOpen] = React.useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);

  // color-pallet-menu operations
  const handleCpToggle = () => {
    setCpOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    setCpOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setCpOpen(false);
    }
  }
  const handleClickGetColor = (e, color) => {
    if (props.parent == "viewNote") {
      props.changeColor(e, color);
    }
    if (props.parent == "createNote") {
      props.addColor(e, color);
    }
  };

  // archives operations
  const handleClickArchive = () => {
    console.log("Archive API call");
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isArchived: true,
    };
    Service.archiveNotes(noteData, token)
      .then((noteData) => {
        console.log(noteData);
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in archives: ", error);
      });
  };

  // trash operations
  const handleMoreMenuToggle = () => {
    setMoreMenuOpen((prevOpen) => !prevOpen);
    console.log("Clicked on more icon in icon.jsx");
  };
  const handleClickMoreMenuClose = () => {
    setMoreMenuOpen(false);
  };
  const handleMoreListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setMoreMenuOpen(false);
    }
  };
  const handleClickTrash = () => {
    console.log("Trash API call");
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isDeleted: true,
    };
    Service.trashNotes(noteData, token)
      .then((noteData) => {
        console.log(noteData);
        setMoreMenuOpen(false);
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in trash: ", error);
      });
  };

  return (
    <div className="icons-group">
      {props.isDeleted ? (
        <div className="icons-group">
          <IconButton aria-label="Archive">
            <RestoreFromTrashRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Archive">
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div className="icons-group">
          <IconButton aria-label="Remind me">
            <AddAlertOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Add colaborators">
            <PersonAddOutlinedIcon fontSize="small" />
          </IconButton>

          <div className="color-pallet-wrapper">
            <IconButton aria-label="Add colour" onClick={handleCpToggle}>
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <ColorPalletMenu
              cpOpen={cpOpen}
              handleListKeyDown={handleListKeyDown}
              handleClose={handleClose}
              // addColor={props.addColor}
              handleClickGetColor={handleClickGetColor}
            />
          </div>

          <IconButton aria-label="Add image">
            <CropOriginalRoundedIcon fontSize="small" />
          </IconButton>

          {props.isArchived ? (
            <IconButton
              aria-label="Archive"
              //onClick={handleClickUnArchive}
            >
              <UnarchiveOutlinedIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton aria-label="Archive" onClick={handleClickArchive}>
              <ArchiveOutlinedIcon fontSize="small" />
            </IconButton>
          )}

          <div className="more-menu-wrapper">
            <IconButton aria-label="More" onClick={handleMoreMenuToggle}>
              <MoreVertRoundedIcon fontSize="small" />
            </IconButton>
            <Popper
              open={moreMenuOpen}
              role={undefined}
              className="more-menu-popper"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <div className="more-menu-container">
                    <ClickAwayListener onClickAway={handleClickMoreMenuClose}>
                      <MenuList
                        autoFocusItem={moreMenuOpen}
                        id="menu-list-grow"
                        onKeyDown={handleMoreListKeyDown}
                      >
                        <MenuItem
                          className="more-item"
                          onClick={handleClickTrash}
                        >
                          <DeleteOutlineRoundedIcon />
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </div>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      )}
    </div>
  );
}
