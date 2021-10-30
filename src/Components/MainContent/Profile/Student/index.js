import React from "react";
import styled from "styled-components";
import StudentMyResume from "./StudentMyResume";
import StudentMyClass from "./StudentMyClass";

const StyleStudentMainArea = styled.div`
  width: 100%;
  background-color: white;
`;

const StudentMainArea = (props) => {
  return (
    <StyleStudentMainArea>
      <StudentMyResume />
      <StudentMyClass />
    </StyleStudentMainArea>
  );
};

export default StudentMainArea;
