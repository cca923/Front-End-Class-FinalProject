import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import EditArea from "./Editor/EditArea";
import Editor from "./Editor/Editor";
import firebase from "../../../../../utils/config/firebase-config";

const StyleMyResume = styled.div`
  width: 100%;
  background-color: white;
`;

const StyleAbout = styled.div`
  background-color: #e9e9e9;
  padding: 20px;
  display: flex;
`;

const StyleOthers = styled.div`
  padding: 20px;
  display: flex;
`;

const StyleImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: gray;
`;

const StyleDetail = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);
  /* max-height: calc(100% - 150px); */
`;
const StyleIdentityArea = styled.div`
  display: flex;
  vertical-align: bottom;
`;

const StyleName = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-right: 20px;
`;

const StyleEmail = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const StyleAreaTitle = styled.h1`
  margin: 20px 0 0px 0;
`;

const StudentMyResume = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const user = firebase.auth().currentUser;

  const sendEdit = useRef();
  const [hover, setHover] = useState(false);

  return (
    <StyleMyResume>
      <StyleAbout>
        <StyleImage src={user.photoURL} alt={identityData.name} />
        <StyleDetail>
          <StyleIdentityArea>
            <StyleName>{identityData.name}</StyleName>
            <StyleEmail>{identityData.email}</StyleEmail>
          </StyleIdentityArea>
          <StyleAreaTitle>About</StyleAreaTitle>
          <EditArea sendEdit={sendEdit} />
        </StyleDetail>
      </StyleAbout>
      <StyleOthers
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>
        <Editor hover={hover} />
      </StyleOthers>
    </StyleMyResume>
  );
};

export default StudentMyResume;
