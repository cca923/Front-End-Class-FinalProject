const identityDataReducer = (
  state = {
    name: "",
    email: "",
    photo: "",
    uid: "",
    about: {},
    talents: [],
    experience: [],
    tag: {},
    resume: [],
    time: [],
    reservation: [],
    comments: [],
    invitation: {},
  },
  action
) => {
  switch (action.type) {
    case "STUDENT_DATA":
      return (state = action.payload);

    case "TEACHER_DATA":
      return (state = action.payload);

    default:
      return state;
  }
};

export default identityDataReducer;
