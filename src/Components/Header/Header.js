import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const StyleHeader = styled.header`
  display: flex;
  top: 0;
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: ${(props) =>
    props.headerColor ? "rgb(255,255,255,0.8)" : "none"};
  z-index: 200;
`;

const StyleLink = styled(Link)`
  color: ${(props) => (props.headerColor ? "#7678ed" : "#fff")};
  line-height: 100px;
  padding: 0px 20px;
  font-size: 60px;
  font-weight: 600;

  /* -webkit-text-fill-color: ${(props) =>
    props.headerColor ? "none" : "#7678ed"};
  -webkit-text-stroke-width: ${(props) => (props.headerColor ? "none" : "2px")};
  -webkit-text-stroke-color: ${(props) =>
    props.headerColor ? "none" : "#fff"}; */
`;

const Header = () => {
  const [headerColor, setHeaderColor] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <StyleHeader headerColor={headerColor}>
      <StyleLink headerColor={headerColor} to="/">
        Re-Live
      </StyleLink>
      <Nav headerColor={headerColor} />
    </StyleHeader>
  );
};

export default Header;
