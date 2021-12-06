const liveStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "LIVE_STATUS":
      return action.payload;

    default:
      return state;
  }
};

export default liveStatusReducer;
