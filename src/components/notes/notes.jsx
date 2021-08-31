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
  const [pinnedNotes, setPinnedNotes] = React.useState([]);
  const [unPinnedNotes, setUnPinnedNotes] = React.useState([]);
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
        <div className="row mx-0 px-1">
          <p
            className="font-weight-bolder small text-black-50 mx-2 mb-1"
            style={{ letterSpacing: 1 }}
          >
            PINNED
          </p>
        </div>
        <div className="display-note-container mb-4">
          <DisplayNote
            displayNote={displayNote}
            notes={filteredNotes.filter(function (e) {
              return e.isPined === true;
            })}
          />
        </div>
        <div className="row mx-0 px-1">
          <p
            className="font-weight-bolder small text-black-50 mx-2 mb-1"
            style={{ letterSpacing: 1 }}
          >
            OTHERS
          </p>
        </div>
        <div className="display-note-container mb-4">
          <DisplayNote
            displayNote={displayNote}
            notes={filteredNotes.filter(function (e) {
              return e.isPined === false;
            })}
          />
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
