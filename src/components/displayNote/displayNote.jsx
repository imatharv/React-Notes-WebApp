import "./displayNoteStyles.scss";
import NoteService from "../../services/noteService";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateNoteDialog from "../updateNote/updateNote";
import PersonOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Avatar from "@material-ui/core/Avatar";

const Service = new NoteService();

export default function DisplayNotes(props) {
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [background, setBackgroundColor] = React.useState("");

  const handleClickUpdateDialogOpen = (e, data, color) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setBackgroundColor(color);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  // color operations
  // const changeColor = (e, color, id) => {
  //  setBackgroundColor(color);
  //  const token = localStorage.getItem("token");
  //  console.log("NoteId in color change :: ", id);
  //  Cannot getting current note id here
  //  let noteData = {
  //    //noteIdList: id,
  //    color: color,
  //  };
  //  Service.changeColor(noteData, token)
  //   .then((noteData) => {
  //     console.log(noteData);
  //     //props.displayNote();
  //   })
  //   .catch((error) => {
  //     console.log("Data posting error in change color: ", error);
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
              style={{ backgroundColor: data.color }}
            >
              <div style={{ position: "relative" }}>
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
                    onClick={(e) =>
                      handleClickUpdateDialogOpen(e, data, data.color)
                    }
                  >
                    {data.description}
                  </Typography>
                  <div className="row justify-content-start align-items-center">
                    {data.collaborators.map((index, collaborator) => (
                      <div className="col-1" key={index}>
                        <Avatar className="show-collaborator-icon">
                          <PersonOutlinedIcon className="person-icon" />
                        </Avatar>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardActions disableSpacing className="iconbar">
                  <IconsGroup
                    noteId={data.id}
                    isArchived={data.isArchived}
                    isDeleted={data.isDeleted}
                    parent="viewNote"
                    // changeColor={changeColor}
                    displayNote={props.displayNote}
                  />
                </CardActions>
              </div>
            </Card>
          );
        })}
      <UpdateNoteDialog
        bgColor={background}
        open={open}
        data={updateNoteData}
        close={handleClickUpdateDialogClose}
        displayNote={props.displayNote}
        //changeColor={changeColor}
      />
    </React.Fragment>
  );
}
