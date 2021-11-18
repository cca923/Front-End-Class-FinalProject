import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeSignPage } from "../../Redux/Action";
import firebase from "../../utils/config/firebase-config";

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

const MobileNav = (props) => {
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus); // 視訊室狀態
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  // 不用 signStatus Redux 判斷，用 onAuthStateChanged，拆開成兩個 useEffect
  return currentUser === null ? (
    <StyleNav layer={props.layer}>
      <StyleLink headerColor={props.headerColor} exact to="/">
        Home
      </StyleLink>
      <StyleSignLink
        headerColor={props.headerColor}
        onClick={() => dispatch(changeSignPage(true))}>
        Sign
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav layer={props.layer}>
      {liveStatus ? (
        <StyleSignLink headerColor={props.headerColor} liveStatus={liveStatus}>
          Live
        </StyleSignLink>
      ) : (
        <>
          {identity === "student" ? (
            <>
              <StyleLink headerColor={props.headerColor} exact to="/">
                Home
              </StyleLink>
              <StyleLink headerColor={props.headerColor} to="/teachers">
                Teachers
              </StyleLink>
            </>
          ) : null}
          <StyleLink headerColor={props.headerColor} to="/live">
            Live
          </StyleLink>

          {identity === "student" ? (
            <StyleLink headerColor={props.headerColor} to="/profile/myresume">
              Profile
            </StyleLink>
          ) : (
            <StyleLink headerColor={props.headerColor} to="/profile/myprofile">
              Profile
            </StyleLink>
          )}
        </>
      )}
    </StyleNav>
  );
};

export default MobileNav;
