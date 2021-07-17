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
      .then((noteData) => {
        let data = noteData.data.data.data;
        //filter data
        let newArray = data.filter(function (e) {
          return e.isArchived == true && e.isDeleted == false;
        });
        setNotes(newArray);
        console.log(noteData);
        // for (let i=0; i<notedata.data.data.data.length; i++) {
        //   setNotes(notedata.data.data.data[i]);
        // }
        // if (
        //   notedata.data.data.data.isArchived == true &&
        //   notedata.data.data.data.isDeleted !== true
        // )
        //setNotes(notedata.data.data.data);
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
