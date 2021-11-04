import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "../../../../../../utils/config/firebase-config";
import { nanoid } from "nanoid";
import Resume from "./Resume";

const StyleEachReservation = styled.div`
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
  cursor: pointer;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const EachReservation = (props) => {
  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const [studentData, setStudentData] = useState([]);
  // console.log("該學生的資料", studentData);
  const [displayResume, setDisplayResume] = useState(false);

  useEffect(() => {
    studentsCollection
      .where("email", "==", props.eachReservation.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setStudentData(doc.data());
        });
      })
      .catch((error) => {
        console.log("資料讀取錯誤", error);
      });
  }, []);

  return (
    <StyleEachStudent>
      <StyleOrderNumber>
        預定編號：
        <span>{props.eachReservation.time}</span>
      </StyleOrderNumber>
      <StyleImage alt={studentData.name} src={studentData.photo} />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{studentData.name}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>Email </StyleLabel>
          <StyleData>{props.eachReservation.email}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>日期</StyleLabel>
          <StyleData>
            {new Date(props.eachReservation.time * 1000).toLocaleString(
              navigator.language,
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </StyleData>
        </StyleEachDetail>

        <StyleResume
          onClick={() => {
            setDisplayResume(true);
          }}>
          他的履歷
        </StyleResume>
        {displayResume ? (
          <Resume
            setDisplayResume={setDisplayResume}
            studentData={studentData}
          />
        ) : null}
      </StyleDetail>
    </StyleEachStudent>
  );
};

export default EachReservation;
