export const getIdentity = (identity) => {
  return {
    type: "IDENTITY",
    payload: identity,
  };
};

export const changeSignPage = (signState) => {
  return {
    type: "CHANGE_SING_PAGE",
    payload: signState,
  };
};

export const getStudentData = (data) => {
  return {
    type: "STUDENT_DATA",
    payload: data,
  };
};

export const getTeacherData = (data) => {
  return {
    type: "TEACHER_DATA",
    payload: data,
  };
};

export const getLiveData = (data) => {
  return {
    type: "LIVE_DATA",
    payload: data,
  };
};
