const signLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SING_LOADING":
      return (state = action.payload);

    default:
      return state;
  }
};

export default signLoadingReducer;
