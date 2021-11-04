import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TeacherCalendar from "./TeacherCalendar";
import TeacherReservation from "./TeacherReservation";

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
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  console.log(identity);

  return (
    <StyleMyClass>
      <StyleTitle>Schedule</StyleTitle>
      <TeacherCalendar />
      <StyleTitle>Reservation</StyleTitle>
      <TeacherReservation />
    </StyleMyClass>
  );
};

export default TeacherMyClass;
