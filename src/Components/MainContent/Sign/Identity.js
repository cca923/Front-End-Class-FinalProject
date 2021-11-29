import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getIdentity } from "../../../Redux/Action";

const StyleIdentity = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  margin-left: -250px;
  margin-top: -300px;
  background-color: #fff;
  border-radius: 15px;
  z-index: 1200;

  @media only screen and (max-width: 1000px) {
    width: 350px;
    height: 440px;
    margin-left: -175px;
    margin-top: -220px;
  }
`;

const StyleTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 2px solid #7367f0;
  margin: 20px auto 0 auto;
  padding-bottom: 10px;
  width: 70%;
  text-align: center;
  line-height: 1.5rem;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const StyleStudentSelect = styled.div`
  cursor: pointer;
  margin: auto;
  width: 70%;
  height: 30%;
  border-radius: 15px;
  background-image: url(/images/identity-student.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 180px;
  font-size: 50px;
  font-weight: 800;
  color: #fff;
  opacity: ${(props) => (props.identity === "student" ? "1" : "0.3")};

  :hover {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
    transform: scale(1.005);
    transition: all 0.3s;
    opacity: 1;
  }

  @media only screen and (max-width: 1000px) {
    font-size: 40px;
    line-height: 150px;
  }
`;

const StyleTeacherSelect = styled.div`
  cursor: pointer;
  margin: 0 auto auto auto;
  width: 70%;
  height: 30%;
  border-radius: 15px;
  background-image: url(/images/identity-teacher.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 180px;
  font-size: 50px;
  font-weight: 800;
  color: #fff;
  opacity: ${(props) => (props.identity === "teacher" ? "1" : "0.3")};

  :hover {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
    transform: scale(1.005);
    transition: all 0.3s;
    opacity: 1;
  }

  @media only screen and (max-width: 1000px) {
    font-size: 40px;
    line-height: 150px;
  }
`;

const Identity = () => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();

  return (
    <StyleIdentity>
      <StyleTitle>請選擇您的身份</StyleTitle>
      <StyleStudentSelect
        identity={identity}
        onClick={() => {
          dispatch(getIdentity("student"));
        }}>
        Student
      </StyleStudentSelect>
      <StyleTeacherSelect
        identity={identity}
        onClick={() => {
          dispatch(getIdentity("teacher"));
        }}>
        Teacher
      </StyleTeacherSelect>
    </StyleIdentity>
  );
};

export default Identity;
