import React, { useEffect } from "react";
import DisplayNotes from "../displayNote/displayNote";
import NoteService from "../../services/noteService";

const Service = new NoteService();

export default function Trash() {
  const [notes, setNotes] = React.useState([]);

  const displayNote = () => {
    console.log("Trash API call");
    const token = localStorage.getItem("token");
    Service.getTrashNotes(token)
      .then((notedata) => {
        console.log(notedata);
        //   console.log(noteData.data.data.data);
        //   setNotes(noteData.data.data.data);
      })
      .catch((error) => {
        console.log("Data fetch error in trash: ", error);
      });
  };
  useEffect(() => {
    displayNote();
  }, []);
  return <DisplayNotes notes={notes} />;
}
