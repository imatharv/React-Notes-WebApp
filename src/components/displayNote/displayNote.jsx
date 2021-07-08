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

export default function DisplayNotes() {
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    displayNote();
  }, []);

  const displayNote = () => {
    console.log("API call");
    const token = localStorage.getItem("token");
    Service.getNote(token)
      .then((noteData) => {
        console.log(noteData);
        setNotes(noteData.data.data);
        console.log(notes);
      })
      .catch((error) => {
        console.log("Data fetch error: ", error);
      });
  };

  return (
    <div>
      {notes.map((data) => {
        return (
          <Card className="displayNote" key={data.id}>
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
                  // value={data.title}
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
                // value={data.description}
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
    </div>
  );
}
