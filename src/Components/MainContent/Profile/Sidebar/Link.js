import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

const StyleLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
    margin-left: auto;
    margin-top: 0;
  }
`;

const StyleLink = styled(NavLink)`
  width: 150px;
  font-size: 1.5rem;
  position: relative;
  display: inline-flex;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #e66158;
  transition: 0.3s;
  margin: 0 auto 20px;

  &:hover {
    padding-left: 0.7em;
    background-color: #f3f3f3;
  }

  @media only screen and (max-width: 1300px) {
    margin: auto 15px;
    width: 160px;
    font-size: 1.5rem;
    position: relative;
    display: inline-flex;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #e66158;
    transition: 0.3s;

    &:hover {
      padding-left: 0.5em;
      padding-top: 0.7em;
      background-color: #f3f3f3;
    }
  }

  @media only screen and (max-width: 1120px) {
    display: none;
  }
`;

const StyleIconDown = styled(FontAwesomeIcon)`
  margin-left: auto;
  display: none;

  @media only screen and (max-width: 1300px) {
    display: inline-block;
  }
`;

const StyleMobileIconDown = styled(FontAwesomeIcon)`
  display: none;

  @media only screen and (max-width: 1120px) {
    display: inline-block;
    font-size: 30px;
    margin-top: auto;
    cursor: pointer;
  }
`;

const StyleIconRight = styled(FontAwesomeIcon)`
  margin-left: auto;
  display: inline-block;

  @media only screen and (max-width: 1300px) {
    display: none;
  }
`;

const Link = ({ layer, setLayer }) => {
  const identity = useSelector((state) => state.identity);

  return (
    <StyleLinkContainer>
      {identity === "student" ? (
        <>
          <StyleLink
            exact
            to="/profile/myresume"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#ebe9e9" }}>
            My Resume
            <StyleIconDown icon={faCaretDown} color="#e66158" />
            <StyleIconRight icon={faCaretRight} color="#e66158" />
          </StyleLink>
          <StyleLink
            exact
            to="/profile/myclass"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#ebe9e9 " }}>
            My Class
            <StyleIconDown icon={faCaretDown} color="#e66158" />
            <StyleIconRight icon={faCaretRight} color="#e66158" />
          </StyleLink>
        </>
      ) : (
        <>
          <StyleLink
            exact
            to="/profile/myprofile"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#ebe9e9 " }}>
            My Profile
            <StyleIconDown icon={faCaretDown} color="#e66158" />
            <StyleIconRight icon={faCaretRight} color="#e66158" />
          </StyleLink>
          <StyleLink
            exact
            to="/profile/myclass"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#ebe9e9 " }}>
            My Class
            <StyleIconDown icon={faCaretDown} color="#e66158" />
            <StyleIconRight icon={faCaretRight} color="#e66158" />
          </StyleLink>
        </>
      )}
      <StyleMobileIconDown
        icon={layer ? faCaretUp : faCaretDown}
        color="#e66158"
        onClick={() => {
          layer ? setLayer(false) : setLayer(true);
        }}
      />
    </StyleLinkContainer>
  );
};

export default Link;
