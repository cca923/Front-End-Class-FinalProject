import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { teacherData } from "../../../../../utils/firebase";
import noPhoto from "../../../../../images/resume-noPhoto.png";

const StyleEachTeacher = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 6px 6px 12px 2px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 1020px) {
    height: 120px;
    flex-direction: row;
  }

  @media only screen and (max-width: 650px) {
    height: 270px;
    flex-direction: column;
    height: fit-content;
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
  background-color: #e1e1e1;
  object-fit: cover;
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
  border-right: 1px solid #7367f0;
  margin-right: 10px;
`;

const StyleData = styled.span``;

const EachReservation = ({ eachReservation }) => {
  const [eachTeacherData, setEachTeacherData] = useState([]);

  useEffect(() => {
    teacherData(eachReservation.email).then((doc) => {
      setEachTeacherData(doc.data());
    });
  }, []);

  return (
    <StyleEachTeacher>
      <StyleOrderNumber>
        預定編號：
        <span>{eachReservation.time}</span>
      </StyleOrderNumber>
      <StyleImage
        alt={eachTeacherData.name}
        src={eachTeacherData.photo || noPhoto}
      />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{eachTeacherData.name}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>Email </StyleLabel>
          <StyleData>{eachReservation.email}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>日期</StyleLabel>
          <StyleData>
            {new Date(eachReservation.time).toLocaleString(navigator.language, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </StyleData>
        </StyleEachDetail>
      </StyleDetail>
    </StyleEachTeacher>
  );
};

export default EachReservation;
