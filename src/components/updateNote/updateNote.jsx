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
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PersonOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Avatar from "@material-ui/core/Avatar";

const Service = new NoteService();

export default function UpdateNoteDialog(props) {
  const [id, setId] = React.useState("");
  const [updatedTitle, setUpdatedTitle] = React.useState("");
  const [updatedContent, setUpdatedContent] = React.useState("");
  const [dialogBgColor, setDialogBgColor] = React.useState("");
  const [collaborators, setCollaborators] = React.useState([]);
  const [reminder, setReminder] = React.useState([]);
  //const [image, setImage] = React.useState("");

  const updateNote = () => {
    if (validate()) {
      const token = localStorage.getItem("token");
      let noteUpdateData = new FormData(); // Currently empty
      noteUpdateData.append("noteId", id);
      noteUpdateData.append("title", updatedTitle);
      noteUpdateData.append("description", updatedContent);
      // noteUpdateData.append("file", image);
      Service.updateNote(noteUpdateData, token)
        .then((noteUpdateData) => {
          props.displayNote();
          props.close();
        })
        .catch((error) => {
          console.log("Data posting error in update note: ", error);
        });
    } else {
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
      setId(props.data.id);
      setUpdatedTitle(props.data.title);
      setUpdatedContent(props.data.description);
      setDialogBgColor(props.data.color);
      if (
        props.data.collaborators !== "" &&
        props.data.collaborators !== undefined
      ) {
        setCollaborators(props.data.collaborators);
      }
      if (props.data.reminder !== 0 && props.data.reminder !== undefined) {
        setReminder(props.data.reminder);
      }
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
  const handleClickRemoveReminder = (e, noteId) => {
    //e.preventDefault();
    const token = localStorage.getItem("token");
    //let noteId = props.data.id;
    let data = {
      id: props.data.id,
    };
    Service.removeReminder(data, token)
      .then((res) => {
        console.log(res);
        props.displayNote();
        setReminder("");
      })
      .catch((error) => {
        console.log("Data posting error in remove reminder: ", error);
      });
  };
  // const handleNoteImage = (image) => {
  //   setImage(image);
  // };
  // const displayNoteImage = (image) => {
  //   let Url = "http://fundoonotes.incubation.bridgelabz.com/";
  //   if (image !== undefined && image !== "") {
  //     let splitter = image.split("/");
  //     if (splitter.length > 2) {
  //       splitter.splice(0, 1);
  //       let picture = Url + splitter.join("/");
  //       return (
  //         <div className="row justify-content-center align-items-center my-3">
  //           <div className="col-10 col-sm-8 col-md-5">
  //             <img
  //               className="img-fluid shadow-sm rounded-lg border border-light"
  //               src={picture}
  //             />
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       let picture = Url + image;
  //       return (
  //         <div className="row justify-content-center align-items-center my-3">
  //           <div className="col-4">
  //             <img
  //               className="img-fluid shadow-sm rounded-lg border border-light"
  //               src={picture}
  //             />
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  // };
  return (
    <Dialog maxWidth="md" className="update-note-dialog" open={props.open}>
      {/* <ClickAwayListener onClickAway={props.close}> */}
      <DialogContent
        className="dialog-content"
        style={{ backgroundColor: dialogBgColor }}
      >
        <Card className="updateNote" style={{ backgroundColor: dialogBgColor }}>
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
            className="note-heading-wrapper"
          />
          <CardContent className="note-content-wrapper">
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
          {/* {displayNoteImage(props.data.imageUrl)} */}
        </Card>
        <div className="row justify-content-start align-items-center my-3 mx-0">
          {reminder.map((reminder, index) => (
            <div
              className="display-reminder-container ml-3 mr-0 px-2"
              key={index}
              onClick={(e) => {
                handleClickRemoveReminder(id);
              }}
            >
              <p className="my-1">{reminder.slice(3, 16)}</p>
            </div>
          ))}
          {collaborators.map((index, collaborator) => (
            <div className="col-1 pr-0" key={index}>
              <Avatar
                className="show-collaborator-icon"
                // onClick={handleClickOpenCollabDialog}
              >
                <PersonOutlinedIcon className="person-icon" />
              </Avatar>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions style={{ backgroundColor: dialogBgColor }}>
        <IconsGroup
          updatedTitle={updatedTitle}
          updatedContent={updatedContent}
          noteId={id}
          displayNote={props.displayNote}
          parent="viewNote"
          changeColor={changeColor}
          data={props.data}
          //handleNoteImage={handleNoteImage}
        />
        <Button onClick={updateNote} className="dialog-close-button">
          Close
        </Button>
      </DialogActions>
      {/* </ClickAwayListener> */}
    </Dialog>
  );
}
