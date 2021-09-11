import "./displayNoteStyles.scss";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconsGroup from "../icons/icons";
import UpdateNoteDialog from "../updateNote/updateNote";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import Avatar from "@material-ui/core/Avatar";
import Pin from "../pin/pin";
import Masonry from "react-masonry-css";
// import CardMedia from "@material-ui/core/CardMedia";

export default function DisplayNotes(props) {
  const [updateNoteData, setUpdateNoteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [background, setBackgroundColor] = React.useState("");

  // Masonry CSS breakpoints
  const breakpointColumnsObj = {
    default: 5,
    1172: 4,
    972: 3,
    772: 2,
    528: 1,
  };

  const handleClickUpdateDialogOpen = (e, data, color) => {
    e.preventDefault();
    setUpdateNoteData(data);
    setBackgroundColor(color);
    setOpen(true);
  };

  const handleClickUpdateDialogClose = () => {
    setOpen(false);
  };

  function displayIsPinned(data) {
    if (data.isPined) {
      return (
        <Pin
          parent="viewNote"
          isPinned={data.isPined}
          noteId={data.id}
          displayNote={props.displayNote}
        />
      );
    } else {
      return (
        <Pin
          parent="viewNote"
          isPinned={data.isPined}
          noteId={data.id}
          displayNote={props.displayNote}
        />
      );
    }
  }

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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid mb-4"
        columnClassName="my-masonry-grid_column"
      >
        {/* <React.Fragment> */}
        {/* <div className="my-masonry-grid_column"> */}
        {props.notes
          .slice(0)
          .reverse()
          .map((data) => {
            return (
              <Card
                className="displayNote"
                key={data.id}
                style={{
                  backgroundColor: data.color,
                }}
              >
                {/* <div style={{ position: "relative" }}> */}
                {/* DISPLAY NOTE IMAGE HERE */}
                {/* {displayNoteImage(data.imageUrl)} */}
                {/* <CardMedia
                          className={classes.media}
                          image="/static/images/cards/contemplative-reptile.jpg"
                          title="Contemplative Reptile"
                        /> */}
                <CardHeader
                  title={
                    <div className="row mx-0">
                      <Typography
                        name="noteTitle"
                        className="noteTitle"
                        id="noteTitle"
                        style={{ width: "88%" }}
                      >
                        {data.title}
                      </Typography>
                      <div className="ml-auto">{displayIsPinned(data)}</div>
                    </div>
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
                    {data.reminder.map((reminder, index) => (
                      <div
                        className="display-reminder-container ml-3 mr-0 px-2 mb-1"
                        key={index}
                      >
                        <p className="my-1">{reminder.slice(3, 16)}</p>
                      </div>
                    ))}
                    {data.collaborators.map((index, collaborator) => (
                      <div className="col-1 mr-2 mb-1" key={index}>
                        <Avatar
                          className="show-collaborator-icon"
                          // onClick={handleClickOpenCollabDialog}
                        >
                          <PersonOutlineRoundedIcon className="person-icon" />
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
                    data={data}
                    //collabDialogOpen={collabDialogOpen}
                    //handleClickCloseCollabDialog={handleClickCloseCollabDialog}
                  />
                </CardActions>
                {/* </div> */}
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
        {/* </div> */}
        {/* </React.Fragment> */}
      </Masonry>
    </React.Fragment>
  );
}
