import "./colaboratorStyles.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import NoteService from "../../services/noteService";
import { useEffect } from "react";

const Service = new NoteService();

export default function AddCollaborator(props) {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const [open, setOpen] = React.useState(false);
  const [usersList, setUsersList] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userPopperOpen, setUserPopperOpen] = React.useState(false);
  const [collabUsers, setCollabUsers] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeUserPopper = (event) => {
    if (event.target.value !== "") {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setUserPopperOpen(true);
      event.preventDefault();
      const token = localStorage.getItem("token");
      let data = {
        searchWord: event.target.value,
      };
      Service.SearchUserList(data, token)
        .then((res) => {
          //console.log(res);
          event.preventDefault();
          setUsersList(res.data.data.details);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAnchorEl(null);
      setUserPopperOpen(false);
    }
  };

  const handleAddUser = (user) => {
    //e.preventDefault();
    if (props.parent === "createNote") {
      //using spread operator for all previous data pls new one
      setCollabUsers([...collabUsers, user]);
      setAnchorEl(null);
      setUserPopperOpen(false);
    } else if (props.parent === "viewNote") {
      const token = localStorage.getItem("token");
      let id = props.data.id;
      let data = user;
      Service.AddCollaborator(id, data, token)
        .then((res) => {
          props.displayNote();
          setUserPopperOpen(false);
        })
        .catch((error) => {
          console.log("Data posting error in add collaborator: ", error);
        });
    }
  };

  const handleSave = () => {
    addCollaborator(collabUsers);
    setOpen(false);
  };

  const addCollaborator = (user) => {
    if (props.parent === "createNote") {
      props.getCollaboratingUser(user);
    }
  };

  const handleClickRemoveCollaborator = (userId, e) => {
    //e.preventDefault();
    if (props.parent === "createNote") {
      const removeIndex = collabUsers.findIndex(
        (item) => item.userId === userId // getting index of object
      );
      collabUsers.splice(removeIndex, 1); // removing object
      setCollabUsers(collabUsers);
    } else if (props.parent === "viewNote") {
      const token = localStorage.getItem("token");
      let noteId = props.data.id;
      let collaboratorId = userId;
      Service.RemoveCollaborator(noteId, collaboratorId, token)
        .then((res) => {
          console.log(res);
          props.displayNote();
          const removeIndex = collabUsers.findIndex(
            (item) => item.userId === userId
          );
          collabUsers.splice(removeIndex, 1);
          setCollabUsers(collabUsers);
        })
        .catch((error) => {
          console.log("Data posting error in remove collaborator: ", error);
        });
    }
  };

  useEffect(() => {
    if (props.data) {
      setCollabUsers(props.data.collaborators);
    }
  }, [props.data, collabUsers]);

  return (
    <div className="collaborator-wrapper">
      <IconButton aria-label="Add colaborators" onClick={handleClickOpen}>
        <PersonAddOutlinedIcon fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        // open={open || props.collabDialogOpen}
        onClose={handleClose}
        className="collaborator-dialog"
        aria-labelledby="collaborator-dialog-title"
        aria-describedby="collaborator-dialog-description"
      >
        <DialogTitle id="collaborator-dialog-title">Collaborators</DialogTitle>
        <hr className="mx-3 mt-0" />
        <DialogContent id="collaborator-dialog-description">
          {/* Note Owner */}
          <div className="row justify-content-start align-items-center mb-3">
            <div className="col-1 justify-content-center">
              <Avatar className="collaborator-avatar">
                {firstName.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <div className="col-9">
              <p className="mb-0 collaborator-owner">
                {firstName} {lastName}
              </p>
              <p
                className="font-weight-normal text-black-50 mb-0"
                style={{ marginTop: -3 }}
              >
                {email}
              </p>
            </div>
          </div>

          {/* Collaborators list */}
          {collabUsers.map((user, index) => (
            <div
              key={index}
              className="row justify-content-start align-items-center mb-3"
            >
              <div className="col-1 justify-content-center">
                <Avatar className="collaborator-avatar">
                  {user.firstName.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div className="col-9">
                <p className="mb-0 collaborator-user">
                  {user.firstName} {user.lastName}
                </p>
                <p
                  className="font-weight-normal text-black-50 mb-0"
                  style={{ marginTop: -3 }}
                >
                  {user.email}
                </p>
              </div>
              <div className="col-2">
                <IconButton
                  aria-label="Remove colaborators"
                  onClick={(e) => {
                    handleClickRemoveCollaborator(user.userId, e);
                  }}
                  className="ml-4"
                >
                  <HighlightOffRoundedIcon fontSize="medium" />
                </IconButton>
              </div>
            </div>
          ))}

          {/* Add collaborators */}
          <div className="row justify-content-start align-items-center mb-3">
            <div className="col-1 justify-content-center">
              <Avatar className="add-collaborator-icon">
                <PersonAddOutlinedIcon fontSize="small" />
              </Avatar>
            </div>
            <div className="col-9">
              <TextField
                autoFocus
                margin="dense"
                id="email"
                className="input-collaborator-email"
                placeholder="Person or email to share with"
                type="email"
                onChange={handleChangeUserPopper}
                fullWidth
              />
              <Popper
                open={userPopperOpen}
                anchorEl={anchorEl}
                placement="bottom-start"
                transition
                className="user-list-popper-wrapper"
              >
                <Paper className="user-list-popper">
                  {usersList.map((user, index) => (
                    <p
                      key={index}
                      className="small mb-0 collaborating-user pl-1 rounded-sm"
                      onClick={(e) => {
                        handleAddUser(user, e);
                      }}
                    >
                      {user.email}
                    </p>
                  ))}
                </Paper>
              </Popper>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
