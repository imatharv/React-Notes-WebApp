import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import UpdateDialog from "../updateNote/updateNote";
import React, { useEffect } from "react";

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [id, setId] = React.useState("");
  const [scroll, setScroll] = React.useState(false);
  const handleClickUpdateDialogOpen = (id, title, description) => {
    setOpen(true);
    setScroll(true);
    setId(id);
    setTitle(title);
    setContent(description);
    console.log("In function in notes component");
  };

  return (
    <React.Fragment>
      <div className="dashboard-notes-container">
        <div className="create-note-container">
          <CreateNote />
        </div>
        <div className="display-note-container">
          {/* <div className="display-note-wrapper"> */}
          <DisplayNote dialogOpen={handleClickUpdateDialogOpen} />
          {/* </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
