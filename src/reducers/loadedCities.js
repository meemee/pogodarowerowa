const initialState = {
    isFetching: false,
    city: null,
    history: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_CITY":
        return {
          ...state,
          isFetching: true
        };
      case "FETCH_CITY_SUCCESS":
        return {
          ...state,
          isFetching: false,
          city: action.payload.data.results.slice(0, 1)
        }
      case "RESET_CITY":
        return initialState;
   
      default:
        return state;
    }
  };