const runGuideReducer = (state = false, action) => {
  switch (action.type) {
    case "RUN_GUIDE":
      return action.payload;

    default:
      return state;
  }
};

export default runGuideReducer;
