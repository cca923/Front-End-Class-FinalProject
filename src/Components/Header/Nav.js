import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeSignPage } from "../../Redux/Action";
import firebase from "../../utils/config/firebase-config";

const StyleNav = styled.nav`
  margin-left: auto;
  line-height: 100px;
`;

const StyleLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerColor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
`;

const StyleSignLink = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerColor ? "#222" : "#fff")};
  border-left: 2px solid ${(props) => (props.headerColor ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
  cursor: pointer;
`;

const Nav = (props) => {
  const identity = useSelector((state) => state.identity);
  const signStatus = useSelector((state) => state.signStatus);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // 用 signStatus 不用 onAuthStateChanged 因為要過濾身份！用是否導到會員頁面判斷！
  // BUG 但是 Nav 會因為沒有[導到會員頁面]這件事，而呈現沒有登入過的狀態ＱＱ
  return signStatus === false ? (
    <StyleNav>
      <StyleLink
        headerColor={props.headerColor}
        exact
        to="/"
        activeClassName="selected"
        activeStyle={{ backgroundColor: "#bbadff" }}>
        Home
      </StyleLink>
      <StyleSignLink
        headerColor={props.headerColor}
        onClick={() => dispatch(changeSignPage(true))}>
        Sign
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav>
      {identity === "student" ? (
        <>
          <StyleLink
            headerColor={props.headerColor}
            exact
            to="/"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#bbadff" }}>
            Home
          </StyleLink>
          <StyleLink
            headerColor={props.headerColor}
            to="/teachers"
            activeClassName="selected"
            activeStyle={{ backgroundColor: "#bbadff" }}>
            Teachers
          </StyleLink>
        </>
      ) : null}
      <StyleLink
        headerColor={props.headerColor}
        to="/live"
        activeClassName="selected"
        activeStyle={{ backgroundColor: "#bbadff" }}>
        Live
      </StyleLink>

      {identity === "student" ? (
        <StyleLink
          headerColor={props.headerColor}
          to="/profile/myresume"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#bbadff" }}>
          Profile
        </StyleLink>
      ) : (
        <StyleLink
          headerColor={props.headerColor}
          to="/profile/myprofile"
          activeClassName="selected"
          activeStyle={{ backgroundColor: "#bbadff" }}>
          Profile
        </StyleLink>
      )}
    </StyleNav>
  );
};

export default Nav;
