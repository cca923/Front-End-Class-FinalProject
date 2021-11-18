import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TeacherCalendar from "./Calendar";
import TeacherReservation from "./Reservation";

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

const TeacherMyClass = (props) => {
  return (
    <StyleMyClass>
      <StyleTitle>Schedule</StyleTitle>
      <TeacherCalendar />
      <TeacherReservation />
    </StyleMyClass>
  );
};

export default TeacherMyClass;
