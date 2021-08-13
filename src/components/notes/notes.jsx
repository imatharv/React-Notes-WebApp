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
  const [searchData, setSearchData] = React.useState([]);

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
      })
      .catch((error) => {
        console.log("Data fetch error: ", error);
      });
  };

  let filteredNotes = notes;
  // if (searchData != "") {
  //   filteredNotes = notes.filter((i) =>
  //     i.title.toLowerCase().includes(searchData.toLowerCase())
  //   );
  // }

  // const search = (searchedString) => {
  //   if (searchedString.length == "") {
  //     setNotes(notes);
  //   }
  //   if (searchedString.length >= 3) {
  //     let notesData = [];
  //     Object.keys(notes).map((i) => {
  //       // creating array of number of objects in products
  //       let key = i;
  //       notesData.push(notes[key]); // pushing a perticular product at a perticular position...
  //       const posts = notesData.filter((note) => {
  //         return note.title
  //           .toLowerCase()
  //           .includes(searchedString.toLowerCase());
  //       });
  //       //setFilteredNotes(posts);
  //       setNotes(posts);
  //     });
  //   } else {
  //     setNotes(notes);
  //   }
  // };

  useEffect(() => {
    displayNote();
    setSearchData(props.searchData);
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
  console.log(state);
  // return {
  //   searchData: state.searchBarReducer.searchData,
  // };
}
export default connect(mapStateToProps)(Notes);
