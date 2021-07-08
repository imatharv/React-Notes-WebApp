import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import UpdateDialog from "../updateNote/updateNote";
import React from "react";

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  const handleClickUpdateDialogOpen = () => () => {
    setOpen(true);
    setScroll(true);
    console.log("In function in notes component");
  };
  return (
    <React.Fragment>
      <div className="dashboard-notes-container">
        <div className="create-note-container">
          <CreateNote />
        </div>
        <div className="display-note-container">
          <DisplayNote dialogOpen={handleClickUpdateDialogOpen} />
        </div>
      </div>
      <UpdateDialog open={open} />
    </React.Fragment>
  );
}
