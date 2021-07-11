import "./createNoteStyles.scss";
import NoteService from "../../services/noteService";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconsGroup from "../icons/icons";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import Snackbar from "@material-ui/core/Snackbar";

const Service = new NoteService();

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function CreateNote(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);

  // const handleSnackbar = () => {
  //   setSnackbarOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const handleExpandClick = () => {
    setExpanded(true);
  };

  const [titleText, setTitleText] = React.useState("");
  const [contentText, setContentText] = React.useState("");

  const createNote = () => {
    if (validate()) {
      console.log("API call");
      const token = localStorage.getItem("token");
      let noteData = new FormData(); // Currently empty
      noteData.append("title", titleText);
      noteData.append("description", contentText);
      Service.createNote(noteData, token)
        .then((noteData) => {
          console.log(noteData);
          setExpanded(false);
          setSnackbarOpen(true);
          setSnackbarMessage("Note successfully created");
          
        })
        .catch((error) => {
          console.log("Data posting error: ", error);
          setSnackbarOpen(true);
          setSnackbarMessage("Data posting error");
        });
    } else {
      setExpanded(false);
    }
  };
  const validate = () => {
    let valid = true;
    if (titleText.length == 0) {
      valid = false;
    }
    if (titleText.length == 0) {
      valid = false;
    }
    return valid;
  };

  const handleTitleInputChange = (event) => {
    setTitleText(event.target.value);
  };
  const handleContentInputChange = (event) => {
    setContentText(event.target.value);
  };

  return (
    <React.Fragment>
      <Card className="createNote">
        <CardHeader
          title={
            <TextField
              name="noteTitle"
              className="noteTitle"
              id="noteTitle"
              label=""
              placeholder="Title"
              onChange={handleTitleInputChange}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              multiline
              fullWidth
            />
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              name="noteContent"
              className="noteContent"
              id="noteContent"
              label=""
              placeholder="Take a note.."
              onChange={handleContentInputChange}
              fullWidth
              multiline
            />
          </CardContent>
          <CardActions disableSpacing>
            <IconsGroup />
            <Button className="card-close-button" onClick={createNote}>
              Close
            </Button>
          </CardActions>
        </Collapse>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
