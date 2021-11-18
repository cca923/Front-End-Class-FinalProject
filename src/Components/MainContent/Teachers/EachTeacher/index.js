import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../../../utils/config/firebase-config";
import Calender from "./Calender";
import Comments from "./Comments/index";
import Introduction from "./Introduction";
import loading from "../../../../images/loading.gif";

const StyleEachTeacher = styled.div`
  width: 100%;
`;

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #7367f0;
`;

const StyleIntroductionArea = styled.div`
  width: 90%;
  height: fit-content;
  margin: 50px auto 0;
`;

const StyleAvailableTimeArea = styled.div`
  width: 90%;
  height: fit-content;
  margin: 0 auto 50px;
`;

const StyleStateWrap = styled.div`
  display: flex;
  width: 100%;
`;

const StyleLoading = styled.img`
  width: 50%;
  margin: 0 auto;
  height: 350px;
  object-fit: cover;
`;

const EachTeacher = (props) => {
  const { teacherUid } = useParams();
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const [teacherData, setTeacherData] = useState();
  console.log("該老師的資料！", teacherData);

  useEffect(() => {
    teachersCollection
      .where("uid", "==", teacherUid)
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
    <StyleEachTeacher>
      <StyleHeaderArea />
      {teacherData ? (
        <>
          <StyleIntroductionArea>
            <Introduction teacherData={teacherData} />
          </StyleIntroductionArea>
          <Comments teacherData={teacherData} />
          <StyleAvailableTimeArea>
            <Calender teacherData={teacherData} />
          </StyleAvailableTimeArea>
        </>
      ) : (
        <StyleStateWrap>
          <StyleLoading src={loading} alt={"loading"} />
        </StyleStateWrap>
      )}
    </StyleEachTeacher>
  );
};

export default EachTeacher;
