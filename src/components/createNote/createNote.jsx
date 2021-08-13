import "./createNoteStyles.scss";
import NoteService from "../../services/noteService";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconsGroup from "../icons/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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
  const [titleText, setTitleText] = React.useState("");
  const [contentText, setContentText] = React.useState("");
  const [bgColor, setBackgroundColor] = React.useState("#ffffff");

  const handleClickAway = () => {
    //createNote();
    setExpanded(false);
    setBackgroundColor("#ffffff");
  };
  const handleExpandClick = () => {
    setExpanded(true);
  };
  const addColor = (e, color) => {
    e.stopPropagation();
    setBackgroundColor(color);
    console.log(bgColor);
  };
  const createNote = (event) => {
    if (validate()) {
      console.log("API call");
      const token = localStorage.getItem("token");
      let noteData = new FormData(); // Currently empty
      noteData.append("title", titleText);
      noteData.append("description", contentText);
      noteData.append("color", bgColor);
      Service.createNote(noteData, token)
        .then((noteData) => {
          console.log(noteData);
          setExpanded(false);
          setBackgroundColor("#ffffff");
          props.displayNote();
        })
        .catch((error) => {
          console.log("Data posting error: ", error);
        });
    } else {
      console.info("Create note :: empty data");
      setExpanded(false);
      setBackgroundColor("#ffffff");
    }
  };
  const validate = () => {
    let valid = true;
    if (titleText.length == 0) {
      valid = false;
    }
    if (contentText.length == 0) {
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
      <ClickAwayListener onClickAway={handleClickAway}>
        <Card
          className="createNote"
          style={{ backgroundColor: bgColor }}
          //style={{ backgroundColor: "#ffdfda" }}
        >
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
              <IconsGroup
                titleText={titleText}
                className="icons-group-create-note"
                contentText={contentText}
                displayNote={props.displayNote}
                addColor={addColor}
                parent="createNote"
              />
              <Button className="card-close-button" onClick={createNote}>
                Close
              </Button>
            </CardActions>
          </Collapse>
        </Card>
      </ClickAwayListener>
    </React.Fragment>
  );
}
