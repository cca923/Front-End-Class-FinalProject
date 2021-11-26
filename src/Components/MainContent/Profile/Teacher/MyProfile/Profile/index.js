import React from "react";
import styled from "styled-components";
import TeacherTag from "./Tag";
import TeacherAbout from "./About";
import TeacherTalent from "./Talent";
import TeacherExperience from "./Experience";

const StyleTeacherIntroduction = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-top: 30px;
`;

const StyleTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 20px;
`;

const TeacherProfile = () => {
  return (
    <>
      <TeacherTag />
      <StyleTeacherIntroduction>
        <StyleTitle>個人簡介｜Introduction</StyleTitle>
        <TeacherAbout />
        <TeacherTalent />
        <TeacherExperience />
      </StyleTeacherIntroduction>
    </>
  );
};

export default TeacherProfile;
