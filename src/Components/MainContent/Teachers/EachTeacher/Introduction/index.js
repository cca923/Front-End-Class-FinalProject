import React from "react";
import styled from "styled-components";

import About from "./About";
import Talent from "./Talent";
import Experience from "./Experience";

const StyleIntroduction = styled.div`
  width: 100%;
  height: fit-content;
`;

const Introduction = ({ eachTeacherData }) => {
  return (
    <StyleIntroduction>
      <About eachTeacherData={eachTeacherData} />
      <Talent eachTeacherData={eachTeacherData} />
      <Experience eachTeacherData={eachTeacherData} />
    </StyleIntroduction>
  );
};

export default Introduction;
