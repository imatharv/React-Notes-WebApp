import React, { useEffect } from "react";
import "./archiveStyles.scss";
import DisplayNotes from "../displayNote/displayNote";
import NoteService from "../../services/noteService";

const Service = new NoteService();

export default function Trash() {
  const [notes, setNotes] = React.useState([]);

  const displayNote = () => {
    console.log("Archives Get API call");
    const token = localStorage.getItem("token");
    Service.getArchiveNotes(token)
      .then((notedata) => {
        setNotes(notedata.data.data.data);
        console.log(notedata);
      })
      .catch((error) => {
        console.log("Data fetch error in archives: ", error);
      });
  };
  useEffect(() => {
    displayNote();
  }, []);
  return (
    <div className="dashboard-notes-container">
      <div className="display-note-container">
        <DisplayNotes notes={notes} />
      </div>
    </div>
  );
}
