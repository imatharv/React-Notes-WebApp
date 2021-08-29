import "./createNoteStyles.scss";
import React from "react";
import NoteService from "../../services/noteService";
import Pin from "../pin/pin";
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
  const [isNotePinned, setIsNotePinned] = React.useState(false);
  //const [image, setImage] = React.useState("");
  //const [collaboratingUser, setCollaboratingUser] = React.useState([]);

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
  let collaboratingUsers = [];
  const getCollaboratingUser = (user) => {
    //collaboratingUsers.push(user);
    for (let i = 0; i < user.length; i++) {
      collaboratingUsers.push({
        firstName: user[i].firstName,
        lastName: user[i].lastName,
        email: user[i].email,
        userId: user[i].userId,
      });
    }
    console.log(collaboratingUsers);
  };
  // const removeCollaboratingUser = (userId) => {
  //   for (let i = 0; i < userId.length; i++) {
  //     if (collaboratingUsers.userId === userId) {
  //       collaboratingUsers.splice(0, userId);
  //     }
  //   }
  //   console.log(collaboratingUsers);
  // };
  const createNote = (event) => {
    if (validate()) {
      const token = localStorage.getItem("token");
      let noteData = new FormData(); // Currently empty
      noteData.append("title", titleText);
      noteData.append("description", contentText);
      noteData.append("color", bgColor);
      noteData.append("collaberators", JSON.stringify(collaboratingUsers));
      noteData.append("isPined", isNotePinned);
      // if (image !== undefined && image !== "") {
      //   noteData.append("file", image);
      // }
      Service.createNote(noteData, token)
        .then((noteData) => {
          console.log(noteData);
          setExpanded(false);
          setBackgroundColor("#ffffff");
          props.displayNote();
        })
        .catch((error) => {
          console.log("Data posting error in create note: ", error);
        });
    } else {
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
  const getIsPinned = (isPinned) => {
    setIsNotePinned(isPinned);
  };

  // const handleNoteImage = (image) => {
  //   setImage(image);
  // };
  // const displayNoteImage = (image) => {
  //   if (image !== "" && image !== undefined) {
  //     return (
  //       <div className="row justify-content-center align-items-center mt-3">
  //         <div className="col-4">
  //           <img
  //             className="img-fluid shadow-sm border-light rounded-lg"
  //             src={image}
  //             alt="Note_image"
  //           />
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Card className="createNote" style={{ backgroundColor: bgColor }}>
          <CardHeader
            title={
              <div className="row mx-0">
                <TextField
                  name="noteTitle"
                  className="noteTitle"
                  id="noteTitle"
                  label=""
                  placeholder="Title"
                  onChange={handleTitleInputChange}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  style={{ width: "95%" }}
                  multiline
                />
                <div className="ml-auto">
                  <Pin parent="createNote" getIsPinned={getIsPinned} />
                </div>
              </div>
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
              {/* DISPLAY SELECTED NOTE IMAGE HERE */}
              {/* {displayNoteImage} */}
            </CardContent>
            <CardActions disableSpacing>
              <IconsGroup
                titleText={titleText}
                className="icons-group-create-note"
                contentText={contentText}
                displayNote={props.displayNote}
                addColor={addColor}
                parent="createNote"
                getCollaboratingUser={getCollaboratingUser}
                //noteImage={handleNoteImage}
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
