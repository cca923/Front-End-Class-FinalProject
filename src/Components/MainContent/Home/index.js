import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../Header/Header";
import Introduction from "./Introduction";
import video from "../../../images/home-video.mp4";

const StyleHome = styled.div``;

const StyleImageTeacherArea = styled.div`
  width: 50%;
  height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/home-teacher.png");
`;

const StyleImageStudentArea = styled.div`
  width: 50%;
  height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/home-student.png");
`;

const StyleVideoArea = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  opacity: 0.8;
  background-color: #9092db;
`;

const StyleTextArea = styled.div`
  left: 10%;
  line-height: 1;
  position: absolute;
  top: 45%;
`;

const StyleTextTitle = styled.div`
  color: #fff;
  font-size: 10rem;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 5rem;
  margin-bottom: 80px;

  @media only screen and (max-width: 730px) {
    font-size: 5rem;
    margin-bottom: 20px;
  }
`;

const StyleTextSlogan = styled.div`
  color: #fff;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2px;
  border-left: 20px solid #7367f0;
  padding-left: 20px;
  letter-spacing: 3px;

  @media only screen and (max-width: 730px) {
    font-size: 2rem;
    border-left: 10px solid #7367f0;
  }
`;

const StyleScrollIcon = styled.div`
  bottom: 30px;
  color: #fff;
  font-size: 1.1rem;
  left: 50%;
  line-height: 1.3rem;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);

  :after {
    background-image: url("/images/down.png");
    content: "";
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    margin: 5px auto 0;
    width: 30px;
    height: 30px;
  }
`;

const Home = () => {
  return (
    <StyleHome>
      <StyleVideoArea src={video} autoPlay loop muted></StyleVideoArea>
      <StyleTextArea>
        <StyleTextTitle>Re-Live</StyleTextTitle>
        <StyleTextSlogan>Resume Your Life</StyleTextSlogan>
      </StyleTextArea>
      <StyleScrollIcon>Scroll</StyleScrollIcon>
      <Introduction />
    </StyleHome>
  );
};

export default Home;
