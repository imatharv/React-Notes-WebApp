const initialState = {
    title: "FundooNotes",
  };
  
  function titleReducer(state = initialState, action) {
    switch (action.type) {
      case "Notes":
        return {
          title: "Notes",
        };
      case "Archive":
        return {
          title: "Archive",
        };
      case "Trash":
        return {
          title: "Trash",
        };
      default:
        return state;
    }
  }
  
  export default titleReducer;