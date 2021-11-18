const liveDataReducer = (state = null, action) => {
  switch (action.type) {
    case "LIVE_DATA":
      return (state = action.payload);

    default:
      return state;
  }
};

export default liveDataReducer;
