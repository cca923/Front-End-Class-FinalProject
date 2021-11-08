import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSignPage,
  getIdentity,
  getStudentData,
  getTeacherData,
} from "../../Redux/Action";
import firebase from "../../utils/config/firebase-config";
import Invitation from "./Invitation";

const StyleNav = styled.nav`
  margin-left: auto;
  line-height: 100px;
  position: relative;
`;

const StyleLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerColor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
`;

const StyleSignLink = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerColor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
  cursor: pointer;
`;

const StyleInvitationArea = styled.div`
  display: inline;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  padding: 0px 40px;
  position: relative;
`;

const StyleNotification = styled.div`
  position: absolute;
  right: 25px;
  top: -1px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.headerColor
      ? "url('/images/bell-scroll.png')"
      : "url('/images/bell-static.png')"};

  &:hover {
    background-image: url("/images/bell.gif");
    border-radius: 50%;
    padding: 5px;
    opacity: 0.8;
  }
`;

const StyleInvitation = styled.div`
  position: absolute;
  right: 25px;
  top: -12px;
  width: 30px;
  height: 30px;
  color: red;
  font-size: 1rem;
`;

const Nav = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  // console.log(invitationData);

  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();

  const [displayNotification, setDisplayNotification] = useState(false);
  const [displayInvitation, setDisplayInvitation] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);

      const teachersRef = db.collection("teachers").doc(currentUser.email);
      const studentsRef = db.collection("students").doc(currentUser.email);

      teachersRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            dispatch(getIdentity("teacher"));
            dispatch(getTeacherData(doc.data()));
            console.log("老師重整頁面", doc.data());
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
            dispatch(getStudentData(doc.data()));
            console.log("學生重整頁面", doc.data());
          }
        })
        .catch((error) => {
          console.log("資料讀取有誤：", error);
        });
    });
  }, []);

  useEffect(() => {
    if (invitationData) {
      setDisplayNotification(true);
    }
  }, [invitationData]);

  // 不用 signStatus Redux 判斷，用 onAuthStateChanged，拆開成兩個 useEffect
  return currentUser === null ? (
    <StyleNav>
      <StyleLink
        headerColor={props.headerColor}
        exact
        to="/"
        activeClassName="selected"
        activeStyle={{ backgroundColor: "#bbadff" }}>
        Home
      </StyleLink>
      <StyleSignLink
        headerColor={props.headerColor}
        onClick={() => dispatch(changeSignPage(true))}>
        Sign
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav>
      {identity === "student" ? (
        <>
          <StyleLink
            headerColor={props.headerColor}
            exact
            to="/"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#bbadff" }}>
            Home
          </StyleLink>
          <StyleLink
            headerColor={props.headerColor}
            to="/teachers"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#bbadff" }}>
            Teachers
          </StyleLink>
        </>
      ) : null}
      <StyleLink
        headerColor={props.headerColor}
        to="/live"
        activeClassName="selected"
        activeStyle={{ backgroundColor: "#bbadff" }}>
        Live
      </StyleLink>

      {identity === "student" ? (
        <>
          <StyleLink
            headerColor={props.headerColor}
            to="/profile/myresume"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#bbadff" }}>
            Profile
          </StyleLink>
          <StyleInvitationArea>
            <StyleNotification
              headerColor={props.headerColor}
              onClick={() => {
                if (displayNotification) {
                  setDisplayInvitation(true);
                }
              }}
            />
            {displayNotification ? (
              <StyleInvitation>New!</StyleInvitation>
            ) : null}
            {displayInvitation ? (
              <Invitation
                setDisplayInvitation={setDisplayInvitation}
                invitationData={invitationData}
              />
            ) : null}
          </StyleInvitationArea>
        </>
      ) : (
        <StyleLink
          headerColor={props.headerColor}
          to="/profile/myprofile"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#bbadff" }}>
          Profile
        </StyleLink>
      )}
    </StyleNav>
  );
};

export default Nav;
