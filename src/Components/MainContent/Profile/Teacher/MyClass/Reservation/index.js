import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Select from "react-select";

import EachReservation from "./EachReservation/index";

const StyleTeacherReservation = styled.div`
  background-color: #f3f3f3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px 30px;
  margin: 0 auto;
  padding: 30px 30px 50px 30px;

  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
  }
`;

const StyleTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
  padding: 20px 30px;
  width: 100%;
  line-height: 50px;
  height: fit-content;
  background-color: #f3f3f3;
`;

const StyleOderArea = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  padding: 10px;
`;

const StyleSelect = styled(Select)`
  width: 220px;
  margin-left: 20px;

  @media only screen and (max-width: 1020px) {
  }
`;

const StyleNoData = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
  width: 100%;
  line-height: 50px;
  padding: 40px 20px;
`;

const StyleNoDataWrap = styled.div`
  width: 400px;
  display: flex;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  color: #959595;
  text-align: center;
  padding: 0 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
  border-radius: 5px;

  @media only screen and (max-width: 600px) {
    width: 250px;
    font-size: 1.3rem;
  }
`;

const StyleNoOldData = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
  width: 100%;
  line-height: 50px;
  padding: 40px 20px 60px;
`;

const StyleNoDataIcon = styled.div`
  display: inline-block;
  margin: auto auto auto 0;
  width: 25px;
  height: 25px;
  background-image: url("/images/calendar.gif");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const TeacherReservation = () => {
  const identityData = useSelector((state) => state.identityData);
  const reservation = identityData.reservation;

  const [selectUpcomingTimeOrder, setSelectUpcomingTimeOrder] = useState("");
  const [selectPreviousTimeOrder, setSelectPreviousTimeOrder] = useState("");

  const timeRange = [
    { value: "新到舊", label: "新到舊" },
    { value: "舊到新", label: "舊到新" },
  ];

  return (
    <>
      <StyleTitle>Reservation</StyleTitle>
      {reservation ? (
        <>
          {reservation.filter((eachReservation) => {
            return new Date(eachReservation.time) > new Date();
          }).length !== 0 ? (
            <>
              <StyleOderArea>
                <StyleSelect
                  value={selectUpcomingTimeOrder}
                  onChange={(tag) => setSelectUpcomingTimeOrder(tag)}
                  options={timeRange}
                  placeholder={"時間排序預設：舊到新"}
                />
              </StyleOderArea>
              <StyleTeacherReservation>
                {reservation
                  .filter((eachReservation) => {
                    return new Date(eachReservation.time) > new Date();
                  })
                  .sort((a, b) => {
                    if (selectUpcomingTimeOrder.value === "新到舊") {
                      return a.time < b.time ? 1 : -1;
                    } else if (selectUpcomingTimeOrder.value === "舊到新") {
                      return a.time > b.time ? 1 : -1;
                    } else {
                      return a.time > b.time ? 1 : -1; // 預設：舊到新
                    }
                  })
                  .map((eachReservation) => {
                    return (
                      <EachReservation
                        key={nanoid()}
                        eachReservation={eachReservation}
                      />
                    );
                  })}
              </StyleTeacherReservation>
            </>
          ) : (
            <StyleNoData>
              <StyleNoDataWrap>
                <StyleNoDataIcon />
                ｜尚無預約
              </StyleNoDataWrap>
            </StyleNoData>
          )}
        </>
      ) : (
        <StyleNoData>
          <StyleNoDataWrap>
            <StyleNoDataIcon />
            ｜尚無預約
          </StyleNoDataWrap>
        </StyleNoData>
      )}

      <StyleTitle>Previous Reservation | Done or Expired</StyleTitle>
      {reservation ? (
        <>
          {reservation.filter((eachReservation) => {
            return new Date(eachReservation.time) < new Date();
          }).length !== 0 ? (
            <>
              <StyleOderArea>
                <StyleSelect
                  value={selectPreviousTimeOrder}
                  onChange={(tag) => setSelectPreviousTimeOrder(tag)}
                  options={timeRange}
                  placeholder={"時間排序預設：新到舊"}
                />
              </StyleOderArea>
              <StyleTeacherReservation>
                {reservation
                  .filter((eachReservation) => {
                    return new Date(eachReservation.time) < new Date();
                  })
                  .sort((a, b) => {
                    if (selectPreviousTimeOrder.value === "新到舊") {
                      return a.time < b.time ? 1 : -1;
                    } else if (selectPreviousTimeOrder.value === "舊到新") {
                      return a.time > b.time ? 1 : -1;
                    } else {
                      return a.time < b.time ? 1 : -1; // 預設：新到舊
                    }
                  })
                  .map((eachReservation) => {
                    return (
                      <EachReservation
                        key={nanoid()}
                        eachReservation={eachReservation}
                      />
                    );
                  })}
              </StyleTeacherReservation>
            </>
          ) : (
            <StyleNoOldData>
              <StyleNoDataWrap>
                <StyleNoDataIcon />
                ｜尚無過期預約
              </StyleNoDataWrap>
            </StyleNoOldData>
          )}
        </>
      ) : (
        <StyleNoOldData>
          <StyleNoDataWrap>
            <StyleNoDataIcon />
            ｜尚無過期預約
          </StyleNoDataWrap>
        </StyleNoOldData>
      )}
    </>
  );
};

export default TeacherReservation;
