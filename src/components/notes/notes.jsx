import "./notesStyles.scss";
import CreateNote from "../createNote/createNote";
import DisplayNote from "../displayNote/displayNote";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import NoteService from "../../services/noteService";

const Service = new NoteService();

function Notes(props) {
  const location = useLocation();

  const [notes, setNotes] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState([]);

  const displayNote = () => {
    const token = localStorage.getItem("token");
    Service.getNote(token)
      .then((noteData) => {
        let data = noteData.data.data.data;

        //filter data
        let newArray = data.filter(function (e) {
          return e.isArchived == false && e.isDeleted == false;
        });
        setNotes(newArray);
        console.log(newArray);
      })
      .catch((error) => {
        console.log("Data fetch error: ", error);
      });
  };

  let filteredNotes = notes;
  if (searchTerm != "") {
    filteredNotes = notes.filter((i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  useEffect(() => {
    displayNote();
    setSearchTerm(props.searchData);
  }, [props]);

  return (
    <React.Fragment>
      <div className="dashboard-notes-container">
        <div className="create-note-container">
          <CreateNote displayNote={displayNote} />
        </div>
        <div className="display-note-container">
          {/* <div className="display-note-wrapper"> */}
          <DisplayNote displayNote={displayNote} notes={filteredNotes} />
          {/* </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    searchData: state.searchReducer.searchData,
  };
}
export default connect(mapStateToProps)(Notes);
