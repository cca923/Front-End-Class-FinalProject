import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import StudentMainArea from "./Student";
import TeacherMainArea from "./Teacher";

const StyleProfileMainArea = styled.div`
  width: 70%;
  min-height: 100%;
  background-color: #fff;
  position: absolute;
  top: 45%;
  left: 61%;
  margin-left: -35%;
  display: flex;

  @media only screen and (max-width: 1300px) {
    width: 90%;
    left: 5%;
    top: 110%;
    margin-left: 0;
  }
`;

const ProfileMainArea = (props) => {
  const identity = useSelector((state) => state.identity);

  return (
    <StyleProfileMainArea>
      {identity === "student" ? <StudentMainArea /> : <TeacherMainArea />}
    </StyleProfileMainArea>
  );
};

export default ProfileMainArea;
