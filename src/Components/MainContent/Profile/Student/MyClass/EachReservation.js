import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../../../../utils/config/firebase-config";

const StyleEachStudent = styled.div`
  width: 100%;
  height: fit-content;
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

const StyleChat = styled.div`
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

const EachReservation = (props) => {
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const [teacherData, setTeacherData] = useState([]);
  // console.log("該老師的資料", teacherData);

  useEffect(() => {
    teachersCollection
      .where("email", "==", props.eachReservation.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTeacherData(doc.data());
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
      <StyleImage alt={teacherData.name} src={teacherData.photo} />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{teacherData.name}</StyleData>
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

        {/* <StyleChat>和他聊聊</StyleChat> */}
      </StyleDetail>
    </StyleEachStudent>
  );
};

export default EachReservation;
