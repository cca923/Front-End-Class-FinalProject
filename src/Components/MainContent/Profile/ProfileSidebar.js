import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getIdentity,
  checkSignStatus,
  getStudentData,
  getTeacherData,
} from "../../../Redux/Action";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import firebase from "../../../utils/config/firebase-config";

const StyleProfileSidebar = styled.div`
  width: 250px;
  height: fit-content;
  background-color: #fff;
  position: absolute;
  top: 45%;
  left: 15%;
  margin-left: -10%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    width: 90%;
    /* height: 45%; */
    height: fit-content;
    flex-direction: row;
  }
`;

const StyleImage = styled.img`
  width: 200px;
  height: 200px;
  background-color: grey;
  margin: 20px auto;

  @media only screen and (max-width: 1300px) {
    width: 100px;
    height: 100px;
    margin: auto 10px auto 10px;
  }
`;

const StyleDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media only screen and (max-width: 1300px) {
    justify-content: center;
    margin-bottom: 0;
  }
`;

const StyleEachDetail = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
    margin-bottom: 0px;
    padding: 10px;
  }
`;

const StyleLabel = styled.div`
  font-size: 1.2rem;
  width: 80px;
  text-align: center;
  /* margin: 0 auto 10px auto;
  padding-bottom: 10px; */
  padding: 10px;
  margin: 0 auto;
  border-bottom: 1px solid #7678ed;

  @media only screen and (max-width: 1300px) {
    margin: 0 20px 0 0;
    padding: 0;
    border-right: 1px solid #7678ed;
    border-bottom: 0;
    padding-bottom: 0px;
  }
`;

const StyleData = styled.span`
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
  padding: 10px;

  @media only screen and (max-width: 1300px) {
    padding: 0;
  }
`;

const StyleLinkContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
    margin-left: auto;
  }

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }

  /* @media only screen and (max-width: 850px) {
    TODO:Sidebar 重整！變小！
  } */
`;

const StyleLink = styled(NavLink)`
  padding: 10px;
  font-size: 1.5rem;
  margin: 0 auto;

  @media only screen and (max-width: 1300px) {
    margin: auto 20px;
  }
`;

const StyleLogoutButton = styled.div`
  padding: 10px;
  width: 120px;
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

  @media only screen and (max-width: 1300px) {
    margin: auto 20px;
  }
`;

const ProfileSidebar = (props) => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);
  console.log(identityData);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = firebase.auth().currentUser;

  return (
    <StyleProfileSidebar>
      <StyleImage src={identityData.photo} alt={identityData.name} />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{identityData.name}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>Email</StyleLabel>
          <StyleData>{identityData.email}</StyleData>
        </StyleEachDetail>
      </StyleDetail>
      <StyleLogoutButton
        onClick={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              dispatch(checkSignStatus(false));
              history.push("/");
              dispatch(getIdentity(null));
              dispatch(getStudentData({}));
              dispatch(getTeacherData({}));
            });
        }}>
        登出
      </StyleLogoutButton>

      <StyleLinkContainer>
        {identity === "student" ? (
          <>
            <StyleLink
              exact
              to="/profile/myresume"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#bbadff" }}>
              My Resume
            </StyleLink>
            <StyleLink
              exact
              to="/profile/myclass"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#bbadff" }}>
              My Class
            </StyleLink>
          </>
        ) : (
          <>
            <StyleLink
              exact
              to="/profile/myprofile"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#bbadff" }}>
              My Profile
            </StyleLink>
            <StyleLink
              exact
              to="/profile/myclass"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#bbadff" }}>
              My Class
            </StyleLink>
          </>
        )}
      </StyleLinkContainer>
    </StyleProfileSidebar>
  );
};

export default ProfileSidebar;
