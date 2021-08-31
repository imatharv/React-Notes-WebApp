import "./iconsStyles.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
// import { makeStyles } from "@material-ui/core/styles";
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
import AddCollaborator from "../colaborator/colaborator";
import AddReminder from "../reminder/reminder";

const Service = new NoteService();

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: "none",
//   },
// }));

export default function IconsGroup(props) {
  // const classes = useStyles();
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
      const token = localStorage.getItem("token");
      let noteData = {
        noteIdList: [props.noteId],
        color: color,
      };
      Service.changeColor(noteData, token)
        .then((noteData) => {
          props.displayNote();
          props.changeColor(color);
        })
        .catch((error) => {
          console.log("Data posting error in change color: ", error);
        });
    }
    if (props.parent == "createNote") {
      props.addColor(e, color);
    }
  };

  // archives operations
  const handleClickArchive = () => {
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isArchived: true,
    };
    Service.archiveNotes(noteData, token)
      .then((noteData) => {
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in archives: ", error);
      });
  };
  const handleClickUnArchive = () => {
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isArchived: false,
    };
    Service.archiveNotes(noteData, token)
      .then((noteData) => {
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in unarchives: ", error);
      });
  };

  // trash operations
  const handleMoreMenuToggle = () => {
    setMoreMenuOpen((prevOpen) => !prevOpen);
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
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isDeleted: true,
    };
    Service.trashNotes(noteData, token)
      .then((noteData) => {
        setMoreMenuOpen(false);
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in trash: ", error);
      });
  };
  const handleClickUnTrash = () => {
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      isDeleted: false,
    };
    Service.trashNotes(noteData, token)
      .then((noteData) => {
        setMoreMenuOpen(false);
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in untrash: ", error);
      });
  };
  const handleClickDeleteForever = () => {
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
    };
    Service.deleteForever(noteData, token)
      .then((noteData) => {
        setMoreMenuOpen(false);
        props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in delete forever: ", error);
      });
  };

  // upload image operations
  // const handleUploadImage = (e) => {
  //   if (props.parent === "viewNote") {
  //     console.log("viewNote", e.target.files[0].name);
  //     props.handleNoteImage(e.target.files[0].name);
  //   } else if (props.parent === "createNote") {
  //     console.log("createNote", e.target.files[0].name);
  //     props.noteImage(e.target.files[0].name);
  //   }
  //   // if (props.owner === "update") {
  //   //   console.log("createNote", e.target.files[0].name);
  //   //   props.handleNoteImage(e.target.files[0].name);
  //   // }
  // };

  return (
    <div className="icons-group">
      {props.isDeleted ? (
        <div className="icons-group">
          <IconButton aria-label="Archive" onClick={handleClickUnTrash}>
            <RestoreFromTrashRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Archive" onClick={handleClickDeleteForever}>
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      ) : (
        <div className="icons-group">
          <AddReminder
            data={props.data}
            getReminders={props.getReminders}
            displayNote={props.displayNote}
            parent={props.parent}
          />

          <AddCollaborator
            noteData={props.noteData}
            data={props.data}
            parent={props.parent}
            getCollaboratingUser={props.getCollaboratingUser}
            displayNote={props.displayNote}
            // collabDialogOpen={props.collabDialogOpen}
            // handleClickCloseCollabDialog={props.handleClickCloseCollabDialog}
          />

          <div className="color-pallet-wrapper">
            <IconButton aria-label="Add colour" onClick={handleCpToggle}>
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <ColorPalletMenu
              cpOpen={cpOpen}
              handleListKeyDown={handleListKeyDown}
              handleClose={handleClose}
              handleClickGetColor={handleClickGetColor}
            />
          </div>

          <IconButton aria-label="Add image" component="span">
            <CropOriginalRoundedIcon fontSize="small" />
          </IconButton>

          {/* IMAGE UPLOAD CONTROL */}
          {/* <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleUploadImage}
          />
          <label htmlFor="icon-button-file" className="icon-upload">
            <IconButton aria-label="Add image" component="span">
              <CropOriginalRoundedIcon fontSize="small" />
            </IconButton>
          </label> */}

          {props.isArchived ? (
            <IconButton aria-label="Unarchive" onClick={handleClickUnArchive}>
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
