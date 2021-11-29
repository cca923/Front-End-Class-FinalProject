import React from "react";
import styled from "styled-components";

import TeacherDetail from "./Profile/index";

const StyleTeacherMyProfile = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const StyleTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: #f3f3f3;
`;

const TeacherMyProfile = () => {
  return (
    <StyleTeacherMyProfile>
      <StyleTitle>Profile</StyleTitle>
      <TeacherDetail />
    </StyleTeacherMyProfile>
  );
};

export default TeacherMyProfile;
