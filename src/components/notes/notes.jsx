import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import UpdateDialog from "../updateNote/updateNote";
import React, { useEffect } from "react";
import NoteService from "../../services/noteService";
import CpContext from "./cpContext";

const Service = new NoteService();
const openColorPallet = React.createContext();

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [id, setId] = React.useState("");
  const [scroll, setScroll] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [cpOpen, setCpOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setCpOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setCpOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleClickUpdateDialogOpen = (id, title, description) => {
    setOpen(true);
    setScroll(true);
    setId(id);
    setTitle(title);
    setContent(description);
  };

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
  useEffect(() => {
    displayNote();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard-notes-container">
        <div className="create-note-container">
          <CreateNote
            displayNote={displayNote}
            cpOpen={cpOpen}
            anchorRef={anchorRef}
            handleToggle={handleToggle}
            handleClose={handleClose}
            handleListKeyDown={handleListKeyDown}
          />
        </div>
        {/* <CpContext.Provider
          value={{
            cpOpen: cpOpen,
            handleToggle: () => {
              setCpOpen((prevOpen) => !prevOpen);
            },
            handleClose: (event) => {
              if (
                anchorRef.current &&
                anchorRef.current.contains(event.target)
              ) {
                return;
              }
              setCpOpen(false);
            },
          }}
        > */}
        <div className="display-note-container">
          {/* <div className="display-note-wrapper"> */}
          <DisplayNote
            dialogOpen={handleClickUpdateDialogOpen}
            displayNote={displayNote}
            notes={notes}
            cpOpen={cpOpen}
            anchorRef={anchorRef}
            handleToggle={handleToggle}
            handleClose={handleClose}
            handleListKeyDown={handleListKeyDown}
          />
          {/* </div> */}
        </div>
        {/* </CpContext.Provider> */}
      </div>
    </React.Fragment>
  );
}
