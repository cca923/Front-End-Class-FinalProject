import React from "react";
import styled from "styled-components";
import TeacherMyClass from "./TeacherMyClass";
import TeacherMyProfile from "./TeacherMyProfile";

const StyleTeacherMainArea = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TeacherMainArea = (props) => {
  return (
    <StyleTeacherMainArea>
      <TeacherMyClass />
      <TeacherMyProfile />
    </StyleTeacherMainArea>
  );
};

export default TeacherMainArea;
