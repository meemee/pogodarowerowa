const initialState = {
    isFetching: false,
    dog: null,
    history: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "START_FETCHING_DOG":
        return { ...state, isFetching: true, dog: null };
  
      case "SUCCESS_FETCHING_DOG":
        state.history.push(action.dog);
        return { ...state, isFetching: false, dog: action.dog };
  
      case "SET_DOG":
        if (state.dog !== action.dog) {
          state.history = state.history.filter(dog => dog !== action.dog);
          state.history.push(action.dog);
        }
        return { ...state, dog: action.dog };
  
      default:
        return state;
    }
  };
  