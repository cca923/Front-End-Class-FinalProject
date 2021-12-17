import React, { useRef } from "react";
import styled from "styled-components";

import video from "../../../images/home-video.mp4";

import Introduction from "./Introduction";

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
  width: 50px;
  bottom: 30px;
  left: 50%;
  margin-left: -25px;
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.3rem;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  cursor: pointer;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }

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
  const target = useRef();

  return (
    <>
      <StyleVideoArea src={video} autoPlay loop muted />
      <StyleTextArea>
        <StyleTextTitle>Re-Live</StyleTextTitle>
        <StyleTextSlogan>Resume Your Life</StyleTextSlogan>
      </StyleTextArea>
      <StyleScrollIcon
        onClick={() => {
          target.current.scrollIntoView({ behavior: "smooth" });
        }}>
        Scroll
      </StyleScrollIcon>
      <Introduction target={target} />
    </>
  );
};

export default Home;
