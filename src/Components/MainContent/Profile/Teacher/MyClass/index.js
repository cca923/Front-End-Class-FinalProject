import React from "react";
import styled from "styled-components";

import TeacherSchedule from "./Schedule/index";
import TeacherReservation from "./Reservation/index";

const StyleMyClass = styled.div`
  width: 100%;
  background-color: white;
`;

const StyleTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: #f3f3f3;
`;

const TeacherMyClass = () => {
  return (
    <StyleMyClass>
      <StyleTitle>Schedule</StyleTitle>
      <TeacherSchedule />
      <TeacherReservation />
    </StyleMyClass>
  );
};

export default TeacherMyClass;
