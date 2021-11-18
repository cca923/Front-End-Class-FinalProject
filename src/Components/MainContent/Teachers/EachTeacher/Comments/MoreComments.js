import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../../../../utils/config/firebase-config";
import noPhoto from "../../../../../images/no-photo.png";

const StyleMoreComments = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
`;

const StyleComment = styled.div`
  padding: 20px 20px 10px;
  min-height: 5vmin;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 2rem;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
  }
`;

const StyleDetail = styled.div`
  display: flex;
  margin-top: auto;
  padding: 20px 20px;
  background-color: #dedede;
  border-radius: 0 0 20px 20px;
  position: relative;
`;

const StyleImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50% 50% 50% 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px;
  background-color: #f3f3f3;
  object-fit: cover;
`;

const StyleName = styled.div`
  width: calc(100% - 60px);
  line-height: 60px;
  font-weight: 500;
  color: #898292;
  margin-left: 20px;
`;

const StyleTime = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #898292;
  font-size: 0.8rem;
`;

const MoreComments = (props) => {
  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const [studentData, setStudentData] = useState([]);
  console.log("該學生的資料！", studentData);

  useEffect(() => {
    studentsCollection
      .where("email", "==", props.eachComment.email)
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
    <StyleMoreComments>
      <StyleComment>"{props.eachComment.comment}"</StyleComment>
      <StyleDetail>
        <StyleImage src={studentData.photo || noPhoto} alt={studentData.name} />
        <StyleName>學生｜{studentData.name}</StyleName>
        <StyleTime>
          {new Date(props.eachComment.time).toLocaleString(navigator.language, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </StyleTime>
      </StyleDetail>
    </StyleMoreComments>
  );
};

export default MoreComments;
