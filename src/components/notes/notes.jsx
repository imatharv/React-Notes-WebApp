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
        let data = noteData.data.data.data;

        //filter data
        let newArray = data.filter(function (e) {
          return e.isArchived == false && e.isDeleted == false;
        });
        setNotes(newArray);

        // let dataLength = noteData.data.data.data.length;
        // for (let i = 0; i <= dataLength; i++) {
        //   if (data[i].isArchived == false && data[i].isDeleted == false) {
        //     console.log(data[i]);
        //     //setNotes(data[i]);
        //     setNotes([...notes.slice(0, i), data[i], ...notes.slice(i + 1)]);
        //   }
        // }

        // data.map((object) => {
        //   if (object.isArchived == false && object.isDeleted == false) {
        //     console.log(object);
        //     setNotes(object);
        //   }
        // });
        //setNotes(noteData.data.data.data);
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
