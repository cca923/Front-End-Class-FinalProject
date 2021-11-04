import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity } from "../../../Redux/Action";
import styled from "styled-components";

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
  z-index: 1001;

  @media only screen and (max-width: 1000px) {
    width: 350px;
    height: 440px;
    margin-left: -175px;
    margin-top: -220px;
  }
`;

const StyleStudentSelect = styled.div`
  margin: auto;
  width: 70%;
  height: 30%;
  border-radius: 15px;
  background-image: url(/images/home-student.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 180px;
  font-size: 50px;
  font-weight: 800;
  color: #fff;
  opacity: ${(props) => (props.identity === "student" ? "1" : "0.3")};

  :hover {
    opacity: 1;
  }

  @media only screen and (max-width: 1000px) {
    font-size: 40px;
    line-height: 150px;
  }
`;

const StyleTeacherSelect = styled.div`
  margin: auto;
  width: 70%;
  height: 30%;
  border-radius: 15px;
  background-image: url(/images/home-teacher.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  line-height: 180px;
  font-size: 50px;
  font-weight: 800;
  color: #fff;
  opacity: ${(props) => (props.identity === "teacher" ? "1" : "0.3")};

  :hover {
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
