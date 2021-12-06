const identityDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "STUDENT_DATA":
      return action.payload;

    case "TEACHER_DATA":
      return action.payload;

    default:
      return state;
  }
};

export default identityDataReducer;
