const initialState = {
  searchData: "",
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case "Search":
      return {
        searchData: action.searchData,
      };
    default:
      return state;
  }
}

export default searchReducer;
