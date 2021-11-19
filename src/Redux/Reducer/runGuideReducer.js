const runGuideReducer = (state = false, action) => {
  switch (action.type) {
    case "RUN_GUIDE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default runGuideReducer;
