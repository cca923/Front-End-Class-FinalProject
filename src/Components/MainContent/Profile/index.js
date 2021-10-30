// const identity = useSelector((state) => state.identity);
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity } from "../../../Redux/Action";
import StyleProfileSidebar from "./ProfileSidebar";
import ProfileSidebar from "./ProfileSidebar";
import ProfileMainArea from "./ProfileMainArea";
import Identity from "../Sign/Identity";

const StyleProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyleProfileStudentImage = styled.div`
  width: 100%;
  height: 50vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("./images/profile-student.png");

  @media only screen and (max-width: 1300px) {
    height: 40vh;
  }
`;

const StyleProfileTeacherImage = styled.div`
  width: 100%;
  height: 50vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("./images/profile-teacher.png");

  @media only screen and (max-width: 1300px) {
    height: 40vh;
  }
`;

const Profile = (props) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [displayTeacher, setDisplayTeacher] = useState(false);
  const [displayStudent, setDisplayStudent] = useState(false);

  const user = firebase.auth().currentUser;

  const db = firebase.firestore();
  const teachersRef = db.collection("teachers").doc(user.email);
  const studentsRef = db.collection("students").doc(user.email);

  useEffect(() => {
    teachersRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDisplayTeacher(doc.exists);
          setTeacherData(doc.data());
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    studentsRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setDisplayStudent(doc.exists);
          setStudentData(doc.data());
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const displayProfile = () => {
    if (displayStudent) {
      return (
        <>
          <StyleProfileStudentImage />
          <ProfileMainArea />
          <ProfileSidebar />
        </>
      );
    } else if (displayTeacher) {
      return (
        <>
          <StyleProfileTeacherImage />
          <ProfileMainArea />
          <ProfileSidebar />
        </>
      );
    } else {
      return (
        <div>
          <Identity />
        </div>
      );
    }
  };

  // !teachersRef.doc(res.user.email) &&
  //         !studentsRef.doc(res.user.email)

  return <StyleProfile>{user !== null ? displayProfile() : null}</StyleProfile>;
};

export default Profile;
