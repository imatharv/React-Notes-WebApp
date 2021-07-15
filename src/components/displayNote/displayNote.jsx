import "./displayNoteStyles.scss";
import NoteService from "../../services/noteService";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateDialog from "../updateNote/updateNote";

const Service = new NoteService();

export default function DisplayNotes(props) {
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [background, setBackgroundColor] = React.useState(props.color);

  const handleClickUpdateDialogOpen = (e, data) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  // color operations
  const changeColor = (color) => {
    setBackgroundColor(color);
    console.log("Change color API call " + background);
    const token = localStorage.getItem("token");
    let noteData = {
      noteIdList: [props.noteId],
      color: color,
    };
    Service.changeColor(noteData, token)
      .then((noteData) => {
        console.log(noteData);
        //props.displayNote();
      })
      .catch((error) => {
        console.log("Data posting error in change color: ", error);
      });
  };

  return (
    <React.Fragment>
      {props.notes
        .slice(0)
        .reverse()
        .map((data) => {
          return (
            <Card
              className="displayNote"
              key={data.id}
              style={{ backgroundColor: background }}
              onClick={(e) => handleClickUpdateDialogOpen(e, data)}
            >
              <CardHeader
                title={
                  <Typography
                    name="noteTitle"
                    className="noteTitle"
                    id="noteTitle"
                  >
                    {data.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography
                  name="noteContent"
                  className="noteContent"
                  id="noteContent"
                >
                  {data.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing className="iconbar">
                <IconsGroup
                  noteId={data.id}
                  parent="viewNote"
                  changeColor={changeColor}
                />
              </CardActions>
            </Card>
          );
        })}
      <UpdateDialog
        bgColor={background}
        open={open}
        data={updateNoteData}
        close={handleClickUpdateDialogClose}
        displayNote={props.displayNote}
        changeColor={changeColor}
      />
    </React.Fragment>
  );
}
