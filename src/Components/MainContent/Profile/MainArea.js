import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import StudentMainArea from "./Student";
import TeacherMainArea from "./Teacher";

const StyleMainArea = styled.div`
  width: 70%;
  min-height: 100%;
  position: absolute;
  top: 45%;
  left: 61%;
  margin-left: -36%;
  display: flex;

  @media only screen and (max-width: 1300px) {
    width: 90%;
    left: 5%;
    top: 110%;
    margin-left: 0;
  }

  @media print {
    width: 100vw;
    margin-left: 0;
    top: 0;
    left: 0;
    -webkit-print-color-adjust: exact;
    margin-top: 20px;
  }
`;

const MainArea = () => {
  const identity = useSelector((state) => state.identity);

  return (
    <StyleMainArea>
      {identity === "student" ? <StudentMainArea /> : <TeacherMainArea />}
    </StyleMainArea>
  );
};

export default MainArea;
