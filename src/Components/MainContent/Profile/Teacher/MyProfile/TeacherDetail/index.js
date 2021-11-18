import React from "react";
import styled from "styled-components";
import TeacherAbout from "./About";
import TeacherTalent from "./Talent";
import TeacherExperience from "./Experience";

const StyleTeacherDetail = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
`;

const StyleTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 10px;
`;

const TeacherDetail = (props) => {
  return (
    <StyleTeacherDetail>
      <StyleTitle>個人簡介｜Introduction</StyleTitle>
      <TeacherAbout />
      <TeacherTalent />
      <TeacherExperience />
    </StyleTeacherDetail>
  );
};

export default TeacherDetail;
