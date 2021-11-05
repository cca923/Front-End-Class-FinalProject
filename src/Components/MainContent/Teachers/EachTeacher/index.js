import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "../../../../utils/config/firebase-config";
import Calender from "./Calender";
import Comments from "./Comments";
import Introduction from "./Introduction";

const StyleEachTeacher = styled.div`
  width: 100%;
`;

const StyleHeaderArea = styled.div`
  /* opacity: 0.8; */
  width: 100%;
  height: 100px;
  background-color: #c4bccf;
  /* background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: -130% 0;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/home-teacher.png");

  @media only screen and (max-width: 1020px) {
    height: 200px;
  } */
`;

const StyleEachTeacherArea = styled.div`
  width: 90%;
  height: fit-content;
  /* background-color: #fff; */
  margin: 10px auto;
`;

const EachTeacher = (props) => {
  return (
    <StyleEachTeacher>
      <StyleHeaderArea />
      <StyleEachTeacherArea>
        <Introduction />
      </StyleEachTeacherArea>
      <Comments />
      <StyleEachTeacherArea>
        <Calender />
      </StyleEachTeacherArea>
    </StyleEachTeacher>
  );
};

export default EachTeacher;
