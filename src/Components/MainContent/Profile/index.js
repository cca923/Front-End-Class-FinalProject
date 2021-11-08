import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity } from "../../../Redux/Action";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import ProfileSidebar from "./ProfileSidebar";
import ProfileMainArea from "./ProfileMainArea";

const StyleProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media only screen and (max-width: 1300px) {
    height: 320px;
  }
`;

const StyleProfileStudentImage = styled.div`
  width: 100%;
  height: 500px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/profile-student.png");

  @media only screen and (max-width: 1300px) {
    height: 320px;
  }
`;

const StyleProfileTeacherImage = styled.div`
  width: 100%;
  height: 500px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/profile-teacher.png");

  @media only screen and (max-width: 1300px) {
    height: 320px;
  }
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
            photo: user.photoURL, // 加入照片 URL
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
            photo: user.photoURL, // 加入照片 URL
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
      {user !== null ? (
        <>
          {identity === "student" ? (
            <StyleProfileStudentImage />
          ) : (
            <StyleProfileTeacherImage />
          )}
          <ProfileMainArea />
          <ProfileSidebar />
        </>
      ) : null}
    </StyleProfile>
  );
};

export default Profile;
