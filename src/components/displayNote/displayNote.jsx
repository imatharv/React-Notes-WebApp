import "./displayNoteStyles.scss";
import NoteService from "../../services/noteService";
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import IconsGroup from "../icons/icons";

const Service = new NoteService();

export default function DisplayNotes(props) {
  const [notes, setNotes] = React.useState([]);

  const handleClickUpdateDialogOpen = (id, title, description) => {
    console.log("clicked in display notes");
    props.dialogOpen(id, title, description);
  };

  // const handleClickUpdateDialogClose = () => {
  //   console.log("clicked in display notes");
  //   props.dialogOpen();
  // };

  useEffect(() => {
    displayNote();
  }, []);

  const displayNote = () => {
    console.log("API call");
    const token = localStorage.getItem("token");
    Service.getNote(token)
      .then((noteData) => {
        console.log(noteData.data.data.data);
        setNotes(noteData.data.data.data);
      })
      .catch((error) => {
        console.log("Data fetch error: ", error);
      });
  };

  return (
    <React.Fragment>
      {notes.map((data) => {
        return (
          <Card
            className="displayNote"
            key={data.id}
            onClick={handleClickUpdateDialogOpen(
              data.id,
              data.title,
              data.description
            )}
          >
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
                  id="standard-textarea noteTitle"
                  label=""
                  value={data.title}
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
                id="standard-textarea noteContent"
                label=""
                value={data.description}
                placeholder="Take a note.."
                multiline
                fullWidth
              />
            </CardContent>
            <CardActions disableSpacing>
              <IconsGroup />
            </CardActions>
          </Card>
        );
      })}
    </React.Fragment>
  );
}
