import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeSignPage, getIdentity } from "../../../Redux/Action";
import styled from "styled-components";
import Signin from "./Signin";
import Signup from "./Signup";
import Identity from "./Identity";

const StyleSignLayer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #979797;
  opacity: 0.5;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 999;
`;

const StyleSignContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  margin-left: -250px;
  margin-top: -300px;

  z-index: 1001;

  @media only screen and (max-width: 1000px) {
    width: 350px;
    height: 440px;
    margin-left: -175px;
    margin-top: -220px;
  }
`;

const StyleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyleSigninButton = styled.div`
  font-size: 2rem;
  top: 25%;
  left: 20%;
  width: 150px;
  height: 60px;
  padding: 10px 20px;
  line-height: 40px;
  background-color: ${(props) => (props.signin ? "white" : "#7678ed")};
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;

  @media only screen and (max-width: 1000px) {
    width: 100px;
    height: 40px;
    font-size: 1.5rem;
    padding-left: 15px;
    line-height: 20px;
  }
`;
const StyleSignupButton = styled.div`
  font-size: 2rem;
  top: 25%;
  left: 10%;
  width: 150px;
  height: 60px;
  padding: 10px 20px;
  line-height: 40px;
  background-color: ${(props) => (props.signup ? "white" : "#7678ed")};
  border-radius: 10px 10px 0px 0px;
  cursor: pointer;

  @media only screen and (max-width: 1000px) {
    width: 100px;
    height: 40px;
    font-size: 1.5rem;
    padding-left: 15px;
    line-height: 20px;
  }
`;

const Sign = (props) => {
  const identity = useSelector((state) => state.identity);
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <StyleSignLayer
        onClick={() => {
          dispatch(changeSignPage(false));
          dispatch(getIdentity(null));
        }}></StyleSignLayer>

      {identity === null ? (
        <Identity />
      ) : (
        <StyleSignContainer>
          <StyleButtonContainer>
            <StyleSigninButton
              signin={signin}
              onClick={() => {
                setSignin(true);
                setSignup(false);
              }}>
              Signin
            </StyleSigninButton>
            <StyleSignupButton
              signup={signup}
              onClick={() => {
                setSignup(true);
                setSignin(false);
              }}>
              Signup
            </StyleSignupButton>
          </StyleButtonContainer>
          {signin ? <Signin /> : <Signup />}
        </StyleSignContainer>
      )}
    </>
  );
};

export default Sign;
