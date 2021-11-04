import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "nanoid";
import EachReservation from "./EachReservation";

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

const StyleStudentReservation = styled.div`
  background-color: #aca5b6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px 30px;
  /* max-width: 1160 px; */
  /* padding: 70 px 24 px; */
  margin: 0 auto;
  padding: 50px 30px;

  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
  }
`;

const StudentMyClass = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const reservation = identityData.reservation;
  console.log(reservation);

  const [displayReservation, setDisplayReservation] = useState(false);

  useEffect(() => {
    // 初始狀態
    if (reservation) {
      setDisplayReservation(true);

      // Global: 讓 Data 按時間大到小排序
      reservation.sort((a, b) => {
        return a.time > b.time ? 1 : -1;
      });
    }
  }, [reservation]);

  return (
    <StyleMyClass>
      <StyleTitle>Reservation</StyleTitle>
      <StyleStudentReservation>
        {displayReservation
          ? reservation.map((eachReservation) => {
              return (
                <EachReservation
                  key={nanoid()}
                  eachReservation={eachReservation}
                />
              );
            })
          : null}
      </StyleStudentReservation>
    </StyleMyClass>
  );
};

export default StudentMyClass;
