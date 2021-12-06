const identityReducer = (state = "", action) => {
  switch (action.type) {
    case "IDENTITY":
      return action.payload;

    default:
      return state;
  }
};

export default identityReducer;
