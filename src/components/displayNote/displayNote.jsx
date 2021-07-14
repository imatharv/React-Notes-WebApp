import "./displayNoteStyles.scss";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateDialog from "../updateNote/updateNote";

export default function DisplayNotes(props) {
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickUpdateDialogOpen = (e, data) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
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
                <IconsGroup noteId={data.id} />
              </CardActions>
            </Card>
          );
        })}
      <UpdateDialog
        open={open}
        data={updateNoteData}
        close={handleClickUpdateDialogClose}
        displayNote={props.displayNote}
      />
    </React.Fragment>
  );
}
