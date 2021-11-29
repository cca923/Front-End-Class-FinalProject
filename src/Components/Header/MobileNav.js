import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeSignPage } from "../../Redux/Action";

const StyleNav = styled.nav`
  line-height: 40px;
`;

const StyleLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  display: block;
  width: 100%;
  padding-left: 50px;

  :hover {
    color: #8e94f2;
    transition: all 0.2s;
  }
`;

const StyleSignLink = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  display: block;
  width: 100%;
  padding-left: 50px;
  cursor: ${(props) => (props.liveStatus ? "not-allowed" : "pointer")};

  :hover {
    color: #8e94f2;
    transition: all 0.2s;
  }
`;

const MobileNav = ({ currentUser }) => {
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus);
  const dispatch = useDispatch();

  return currentUser === null ? (
    <StyleNav>
      <StyleLink exact to="/">
        Home
      </StyleLink>
      <StyleSignLink onClick={() => dispatch(changeSignPage(true))}>
        Sign
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav>
      {liveStatus ? (
        <StyleSignLink liveStatus={liveStatus}>Live</StyleSignLink>
      ) : (
        <>
          {identity === "student" ? (
            <>
              <StyleLink exact to="/">
                Home
              </StyleLink>
              <StyleLink to="/teachers">Teachers</StyleLink>
            </>
          ) : null}
          <StyleLink to="/live">Live</StyleLink>

          {identity === "student" ? (
            <StyleLink to="/profile/myresume">Profile</StyleLink>
          ) : (
            <StyleLink to="/profile/myprofile">Profile</StyleLink>
          )}
        </>
      )}
    </StyleNav>
  );
};

export default MobileNav;
