import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const StyleMobileSidebar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: space-between;
`;

const StyleLink = styled(NavLink)`
  width: 150px;
  font-size: 1.3rem;
  position: relative;
  display: inline-flex;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #e66158;
  transition: 0.3s;
  margin: auto;

  &:hover {
    padding-top: 0.7em;
    background-color: #f3f3f3;
  }
`;

const StyleIconDown = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-left: auto;
`;

const MobileSidebar = (props) => {
  const identity = useSelector((state) => state.identity);

  return (
    <StyleMobileSidebar>
      {identity === "student" ? (
        <>
          <StyleLink
            exact
            to="/profile/myresume"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#f3f3f3 " }}>
            My Resume
            <StyleIconDown icon={faCaretDown} color="#e66158" />
          </StyleLink>
          <StyleLink
            exact
            to="/profile/myclass"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#f3f3f3 " }}>
            My Class
            <StyleIconDown icon={faCaretDown} color="#e66158" />
          </StyleLink>
        </>
      ) : (
        <>
          <StyleLink
            exact
            to="/profile/myprofile"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#f3f3f3 " }}>
            My Profile
            <StyleIconDown icon={faCaretDown} color="#e66158" />
          </StyleLink>
          <StyleLink
            exact
            to="/profile/myclass"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#f3f3f3 " }}>
            My Class
            <StyleIconDown icon={faCaretDown} color="#e66158" />
          </StyleLink>
        </>
      )}
    </StyleMobileSidebar>
  );
};

export default MobileSidebar;
