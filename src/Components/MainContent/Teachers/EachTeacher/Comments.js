import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "../../../../utils/config/firebase-config";

const StyleComments = styled.div`
  width: 100%;
  height: 200px;
  background-color: #fff;
  padding: 20px;
  margin: 20px 0 40px 0;
`;

const Comments = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const user = firebase.auth().currentUser;

  return <StyleComments></StyleComments>;
};

export default Comments;
