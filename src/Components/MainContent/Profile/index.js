import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity } from "../../../Redux/Action";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import Sidebar from "./Sidebar";
import MainArea from "./MainArea";
import loading from "../../../images/loading.gif";

const StyleProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  /* BUG */
  @media only screen and (max-width: 1300px) {
    /* height: 320px; */
  }
`;

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #7367f0;

  @media print {
    display: none;
  }
`;

const StyleProfileStudentImage = styled.div`
  width: 100%;
  height: 400px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-position: center;
  background-image: url("/images/profile-student.png");

  @media only screen and (max-width: 1300px) {
    height: 220px;
  }

  @media print {
    display: none;
  }
`;

const StyleProfileTeacherImage = styled.div`
  width: 100%;
  height: 400px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-position: center;
  background-image: url("/images/profile-teacher.png");

  @media only screen and (max-width: 1300px) {
    height: 220px;
  }

  @media print {
    display: none;
  }
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

const Profile = (props) => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  useEffect(() => {
    const teachersRef = db.collection("teachers").doc(user.email);
    const studentsRef = db.collection("students").doc(user.email);

    teachersRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(getIdentity("teacher"));
          teachersRef.update({
            uid: user.uid, // 加入作為巢狀路由 URL
          });
        }
      })
      .catch((error) => {
        console.log("資料讀取有誤：", error);
      });

    studentsRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(getIdentity("student"));
          studentsRef.update({
            uid: user.uid,
          });
        }
      })
      .catch((error) => {
        console.log("資料讀取有誤：", error);
      });
  }, []);

  // TODO:沒登入過要 Redireact 回首頁！
  return (
    <StyleProfile>
      <StyleHeaderArea />
      {Object.keys(identityData).length !== 0 ? (
        <>
          {identity === "student" ? (
            <StyleProfileStudentImage />
          ) : (
            <StyleProfileTeacherImage />
          )}
          <MainArea />
          <Sidebar />
        </>
      ) : (
        <StyleStateWrap>
          <StyleLoading src={loading} alt={"Loading"} />
        </StyleStateWrap>
      )}
    </StyleProfile>
  );
};

export default Profile;
