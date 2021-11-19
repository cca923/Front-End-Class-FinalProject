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

export const changeSignLoading = (signState) => {
  return {
    type: "SING_LOADING",
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

export const getLiveStatus = (liveState) => {
  return {
    type: "LIVE_STATUS",
    payload: liveState,
  };
};

export const startRunGuide = (runState) => {
  return {
    type: "RUN_GUIDE",
    payload: runState,
  };
};
