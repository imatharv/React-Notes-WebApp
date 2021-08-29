import "./displayNoteStyles.scss";
import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateNoteDialog from "../updateNote/updateNote";
import PersonOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Avatar from "@material-ui/core/Avatar";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 250,
//   },
//   media: {
//     height: "auto",
//   },
// });

export default function DisplayNotes(props) {
  // const classes = useStyles();

  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [background, setBackgroundColor] = React.useState("");
  // const [collabDialogOpen, setCollabDialogOpen] = React.useState(false);

  // const handleClickOpenCollabDialog = () => {
  //   setCollabDialogOpen(true);
  // };

  // const handleClickCloseCollabDialog = () => {
  //   setCollabDialogOpen(false);
  // };

  const handleClickUpdateDialogOpen = (e, data, color) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setBackgroundColor(color);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  // const displayNoteImage = (image) => {
  //   let Url = "http://fundoonotes.incubation.bridgelabz.com/";
  //   if (image !== undefined && image !== "") {
  //     let splitter = image.split("/");
  //     if (splitter.length > 2) {
  //       splitter.splice(0, 1);
  //       let picture = Url + splitter.join("/");
  //       return (
  //         <div className="row justify-content-center align-items-center">
  //           <div className="col-12">
  //             <img className="img-fluid" src={picture} />
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       let picture = Url + image;
  //       return (
  //         <div className="row justify-content-center align-items-center">
  //           <div className="col-12">
  //             <img className="img-fluid" src={picture} />
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
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
                {/* DISPLAY NOTE IMAGE HERE */}
                {/* {displayNoteImage(data.imageUrl)} */}
                {/* <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}
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

                <CardContent
                  onClick={(e) =>
                    handleClickUpdateDialogOpen(e, data, data.color)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Typography
                    name="noteContent"
                    className="noteContent"
                    id="noteContent"
                  >
                    {data.description}
                  </Typography>
                  <div className="row justify-content-start align-items-center mt-3">
                    {data.collaborators.map((index, collaborator) => (
                      <div className="col-1 mr-2" key={index}>
                        <Avatar
                          className="show-collaborator-icon"
                          // onClick={handleClickOpenCollabDialog}
                        >
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
                    //changeColor={changeColor}
                    displayNote={props.displayNote}
                    noteData={data}
                    //collabDialogOpen={collabDialogOpen}
                    //handleClickCloseCollabDialog={handleClickCloseCollabDialog}
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
