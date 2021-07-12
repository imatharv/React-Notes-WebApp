import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import UpdateDialog from "../updateNote/updateNote";
import React, { useEffect } from "react";
import NoteService from "../../services/noteService";
import cpContextProvider from "./cpContextProvider";

const Service = new NoteService();
const openColorPallet = React.createContext();

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

  const [notes, setNotes] = React.useState([]);
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
          <CreateNote displayNote={displayNote} />
        </div>
        <div className="display-note-container">
          {/* <div className="display-note-wrapper"> */}
          <cpContextProvider>
            <DisplayNote
              dialogOpen={handleClickUpdateDialogOpen}
              displayNote={displayNote}
              notes={notes}
            />
          </cpContextProvider>
          {/* </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
