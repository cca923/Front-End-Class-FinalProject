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
