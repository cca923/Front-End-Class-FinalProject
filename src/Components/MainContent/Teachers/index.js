import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import GroupTeachers from "./GroupTeachers";

const StyleTeachers = styled.div`
  opacity: 0.8;
`;

const StyleImageTeacherArea = styled.div`
  width: 50%;
  height: 400px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-position: 130%; */
  display: inline-block;
  vertical-align: bottom;
  background-image: url("./images/home-teacher.png");

  @media only screen and (max-width: 1020px) {
    height: 200px;
  }
`;

const StyleImageStudentArea = styled.div`
  width: 50%;
  height: 400px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("./images/home-student.png");

  @media only screen and (max-width: 1020px) {
    height: 200px;
  }
`;

const StyleTeachersContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const Teachers = (props) => {
  return (
    <StyleTeachers>
      <StyleImageTeacherArea />
      <StyleImageStudentArea />
      <StyleTeachersContainer>
        <Sidebar />
        <GroupTeachers />
      </StyleTeachersContainer>
    </StyleTeachers>
  );
};

export default Teachers;
