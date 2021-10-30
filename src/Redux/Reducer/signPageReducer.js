const signPageReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_SING_PAGE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default signPageReducer;
