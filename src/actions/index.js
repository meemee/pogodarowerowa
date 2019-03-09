export const startFetchingDog = () => ({
    type: "START_FETCHING_DOG"
  });
  
  export const successFetchingDog = dog => ({
    type: "SUCCESS_FETCHING_DOG",
    dog
  });
  
  export const setDog = dog => ({
    type: "SET_DOG",
    dog
  });
  