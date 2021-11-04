const signStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "CHECK_SIGN_STATUS":
      return (state = action.payload);

    default:
      return state;
  }
};

export default signStatusReducer;
