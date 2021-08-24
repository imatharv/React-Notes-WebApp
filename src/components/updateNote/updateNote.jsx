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
import IconsGroup from "../icons/icons";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";

const Service = new NoteService();

export default function UpdateNoteDialog(props) {
  const [id, setId] = React.useState("");
  const [updatedTitle, setUpdatedTitle] = React.useState("");
  const [updatedContent, setUpdatedContent] = React.useState("");
  const [dialogBgColor, setDialogBgColor] = React.useState("");

  const updateNote = () => {
    if (validate()) {
      const token = localStorage.getItem("token");
      let noteUpdateData = new FormData(); // Currently empty
      noteUpdateData.append("noteId", id);
      noteUpdateData.append("title", updatedTitle);
      noteUpdateData.append("description", updatedContent);
      Service.updateNote(noteUpdateData, token)
        .then((noteUpdateData) => {
          props.displayNote();
          props.close();
        })
        .catch((error) => {
          console.log("Data posting error in update note: ", error);
        });
    } else {
      console.info("Update note :: empty data");
      props.close();
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
  React.useEffect(() => {
    if (props.data) {
      setUpdatedTitle(props.data.title);
      setUpdatedContent(props.data.description);
      setDialogBgColor(props.data.color);
      setId(props.data.id);
    }
  }, [props.data]);
  const handleInputTitle = (event) => {
    setUpdatedTitle(event.target.value);
  };
  const handleInputContent = (event) => {
    setUpdatedContent(event.target.value);
  };
  const changeColor = (color) => {
    setDialogBgColor(color);
  };

  return (
    <div>
      <Dialog maxWidth="md" className="update-note-dialog" open={props.open}>
        {/* <ClickAwayListener onClickAway={props.close}> */}
        <DialogContent
          className="dialog-content"
          style={{ backgroundColor: dialogBgColor }}
        >
          <DialogContentText tabIndex={-1}>
            <Card
              className="updateNote"
              style={{ backgroundColor: dialogBgColor }}
            >
              <CardHeader
                // action={
                //   <IconButton aria-label="Pin to top">
                //     <EmojiFlagsRoundedIcon />
                //   </IconButton>
                // }
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
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: dialogBgColor }}>
          <IconsGroup
            updatedTitle={updatedTitle}
            updatedContent={updatedContent}
            noteId={id}
            displayNote={props.displayNote}
            parent="viewNote"
            changeColor={changeColor}
          />
          <Button onClick={updateNote} className="dialog-close-button">
            Close
          </Button>
        </DialogActions>
        {/* </ClickAwayListener> */}
      </Dialog>
    </div>
  );
}
