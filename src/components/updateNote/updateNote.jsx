import "./updateNoteStyles.scss";
import NoteService from "../../services/noteService";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import IconsGroup from "../icons/icons";
import Snackbar from "@material-ui/core/Snackbar";

const Service = new NoteService();

export default function UpdateNoteDialog(props) {
  //const [DialogOpen, setDialogOpen] = React.useState(props.open);
  const [id, setId] = React.useState("");
  const [updatedTitle, setUpdatedTitle] = React.useState("");
  const [updatedContent, setUpdatedContent] = React.useState("");
  // const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // const [snackbarMessage, setSnackbarMessage] = React.useState(false);

  const updateNote = () => {
    if (validate()) {
      console.log("API call");
      const token = localStorage.getItem("token");
      let noteUpdateData = new FormData(); // Currently empty
      noteUpdateData.append("noteId", id);
      noteUpdateData.append("title", updatedTitle);
      noteUpdateData.append("description", updatedContent);
      Service.updateNote(noteUpdateData, token)
        .then((noteUpdateData) => {
          console.log(noteUpdateData);
          // setSnackbarOpen(true);
          // setSnackbarMessage("Note successfully updated");
          props.close();
          props.displayNote();
        })
        .catch((error) => {
          console.log("Data posting error: ", error);
          // setSnackbarOpen(true);
          // setSnackbarMessage("Data posting error");
        });
    } else {
      // setSnackbarOpen(true);
      // setSnackbarMessage("Validation error");
    }
  };
  const validate = () => {
    let valid = true;
    if (updatedTitle.length == 0) {
      valid = false;
    }
    if (updatedContent.length == 0) {
      valid = false;
    }
    return valid;
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.close();
    // setSnackbarOpen(false);
  };
  React.useEffect(() => {
    if (props.data) {
      setUpdatedTitle(props.data.title);
      setUpdatedContent(props.data.description);
      setId(props.data.id);
    }
  }, [props.data]);

  const handleInputTitle = (event) => {
    setUpdatedTitle(event.target.value);
  };
  const handleInputContent = (event) => {
    setUpdatedContent(event.target.value);
  };

  return (
    <div>
      <Dialog open={props.open} maxWidth="md" className="update-note-dialog">
        <DialogContent className="dialog-content">
          <DialogContentText tabIndex={-1}>
            <Card className="updateNote">
              <CardHeader
                action={
                  <IconButton aria-label="Pin to top">
                    <EmojiFlagsRoundedIcon />
                  </IconButton>
                }
                title={
                  <TextField
                    name="noteTitle"
                    className="noteTitle"
                    id="standard-textarea"
                    label=""
                    value={updatedTitle}
                    onChange={handleInputTitle}
                    placeholder="Title"
                    multiline
                    fullWidth
                  />
                }
              />
              <CardContent>
                <TextField
                  name="noteContent"
                  className="noteContent"
                  id="standard-textarea"
                  label=""
                  value={updatedContent}
                  onChange={handleInputContent}
                  placeholder="Take a note.."
                  multiline
                  fullWidth
                />
              </CardContent>
              <CardActions disableSpacing></CardActions>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconsGroup />
          <Button onClick={updateNote} className="dialog-close-button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
      /> */}
    </div>
  );
}
