import "./displayNoteStyles.scss";
import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateDialog from "../updateNote/updateNote";

export default function DisplayNotes(props) {
  // const [notes, setNotes] = React.useState([]);
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  // const [backgroundColor, setBackgroundColor] = React.useState("black");
  // const [textColor, setTextColor] = React.useState("white");

  const handleClickUpdateDialogOpen = (e, data) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  // const handleClickSetColors = () => {
  //   setBackgroundColor("black");
  //   setTextColor("red");
  // };

  return (
    // <cpContext.Consumer>
    //   {(context) => (
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
                <IconsGroup />
              </CardActions>
            </Card>
          );
        })}
      <UpdateDialog
        open={open}
        data={updateNoteData}
        close={handleClickUpdateDialogClose}
        displayNote={props.displayNote}
        cpOpen={props.cpOpen}
        anchorRef={props.anchorRef}
        handleToggle={props.handleToggle}
        handleClose={props.handleClose}
        handleListKeyDown={props.handleListKeyDown}
      />
    </React.Fragment>
    // )}
    // </cpContext.Consumer>
  );
}
