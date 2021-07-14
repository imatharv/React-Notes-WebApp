import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import React, { useEffect } from "react";
import NoteService from "../../services/noteService";

const Service = new NoteService();

export default function Notes() {
  const [notes, setNotes] = React.useState([]);

  const displayNote = () => {
    console.log("API call");
    const token = localStorage.getItem("token");
    Service.getNote(token)
      .then((noteData) => {
        console.log(noteData.data.data.data);
        //filter data
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
          <DisplayNote displayNote={displayNote} notes={notes} />
          {/* </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
