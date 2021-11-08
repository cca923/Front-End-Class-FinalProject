const liveDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIVE_DATA":
      return (state = action.payload);

    default:
      return state;
  }
};

export default liveDataReducer;
