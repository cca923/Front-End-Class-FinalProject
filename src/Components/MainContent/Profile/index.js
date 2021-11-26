import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "./Sidebar/index";
import MainArea from "./MainArea";
import loading from "../../../images/loading.gif";

const StyleProfile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Profile = () => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);

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
