import "./displayNoteStyles.scss";
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import IconsGroup from "../icons/icons";
import UpdateDialog from "../updateNote/updateNote";
import NoteService from "../../services/noteService";

const Service = new NoteService();

export default function DisplayNotes(props) {
  // const [notes, setNotes] = React.useState([]);
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [textColor, setTextColor] = React.useState("white");

  const handleClickUpdateDialogOpen = (e, data) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setOpen(true);
    console.log("clicked in display notes");
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  const handleClickSetColors = () => {
    setBackgroundColor("black");
    setTextColor("red");
  };

  // const displayNote = () => {
  //   console.log("API call");
  //   const token = localStorage.getItem("token");
  //   Service.getNote(token)
  //   .then((noteData) => {
  //     console.log(noteData.data.data.data);
  //     setNotes(noteData.data.data.data);
  //   })
  //   .catch((error) => {
  //     console.log("Data fetch error: ", error);
  //   });
  // };

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
                <IconsGroup serColor={handleClickSetColors} />
              </CardActions>
            </Card>
          );
        })}
      <UpdateDialog
        open={open}
        data={updateNoteData}
        close={handleClickUpdateDialogClose}
      />
    </React.Fragment>
  );
}
