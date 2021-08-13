const initialState = {
  searchData: "",
};

function searchReducer(state = initialState, action) {
  console.log(action.type);
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
