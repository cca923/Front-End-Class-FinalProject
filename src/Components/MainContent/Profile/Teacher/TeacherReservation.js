import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const StyleTeacherReservation = styled.div`
  background-color: #aca5b6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px 30px;
  margin: 0 auto;
  padding: 50px 30px;

  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
  }
`;

const StyleEachStudent = styled.div`
  width: 100%;
  height: 290px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media only screen and (max-width: 1020px) {
    height: 120px;
    flex-direction: row;
  }

  @media only screen and (max-width: 650px) {
    height: 270px;
    flex-direction: column;
  }
`;

const StyleOrderNumber = styled.div`
  position: absolute;
  right: 10px;
  font-size: 10px;
  color: grey;
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: grey;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 10px;

  @media only screen and (max-width: 1020px) {
    width: calc(100% - 100px);
    padding: 17px 10px 0 20px;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
    padding: 17px 10px 0 10px;
  }
`;

const StyleEachDetail = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyleLabel = styled.div`
  width: 50px;
  border-right: 1px solid #7678ed;
  margin-right: 10px;
`;

const StyleData = styled.span``;

const StyleResume = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0px;
  padding: 10px;
  width: 120px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border: 2px solid #bbadff;
  border-radius: 18px;
  margin: 0 auto 20px auto;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const TeacherReservation = (props) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  console.log(identity);

  return (
    <StyleTeacherReservation>
      <StyleEachStudent>
        <StyleOrderNumber>
          訂單編號：
          <span>00000000000</span>
        </StyleOrderNumber>
        <StyleImage alt={"name"} />
        <StyleDetail>
          <StyleEachDetail>
            <StyleLabel>姓名</StyleLabel>
            <StyleData>Anna</StyleData>
          </StyleEachDetail>
          <StyleEachDetail>
            <StyleLabel>Email </StyleLabel>
            <StyleData>anna85923@gmail.com</StyleData>
          </StyleEachDetail>
          <StyleEachDetail>
            <StyleLabel>日期</StyleLabel>
            <StyleData>2021/10/26 上午09:00</StyleData>
          </StyleEachDetail>

          <StyleResume>他的履歷</StyleResume>
        </StyleDetail>
      </StyleEachStudent>
    </StyleTeacherReservation>
  );
};

export default TeacherReservation;
