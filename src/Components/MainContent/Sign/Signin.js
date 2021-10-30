import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSignPage, getIdentity } from "../../../Redux/Action";

import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import {
  facebookProvider,
  googleProvider,
} from "../../../utils/service/authMethod";
import facebook from "../../../images/facebook.png";
import google from "../../../images/google.png";
import Identity from "./Identity";

const StyleSignin = styled.div`
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  border-radius: 0px 15px 15px 15px;
  background-color: white;
  padding: 25px;
  z-index: 99;
  margin: 0;

  @media only screen and (max-width: 1000px) {
    padding: 20px;
  }
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyleInput = styled.input`
  font-size: 1.5rem;
  padding: 15px;
  border-radius: 30px;
  border: 2px solid rgb(128, 128, 128);

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    padding: 10px;
    border-radius: 20px;
  }
`;

const StyleButton = styled.button`
  font-size: 1.5rem;
  margin-top: 15px;
  background-color: #757bc8;
  border: 2px solid #bbadff;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
  }

  @media only screen and (max-width: 1000px) {
    padding: 10px;
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const StyleSeperator = styled.div`
  line-height: 10px;
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: #757bc8;
  margin: 25px 0px;
  position: relative;
  width: 100%;
  text-align: center;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    margin: 20px 0px;
  }

  ::before {
    position: absolute;
    content: "";
    background-color: #757bc8;
    top: 50%;
    right: 0;
    left: 300px;
    height: 1px;

    @media only screen and (max-width: 1000px) {
      left: 180px;
    }
  }

  ::after {
    position: absolute;
    content: "";
    background-color: #757bc8;
    top: 50%;
    left: 0;
    right: 300px;
    height: 1px;

    @media only screen and (max-width: 1000px) {
      right: 180px;
    }
  }
`;

const StyleFacebookLogin = styled.div`
  background-color: #4267b2;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 30px;
  color: white;
  border: 2px solid #34579c;
  cursor: pointer;
  margin-bottom: 10px;

  @media only screen and (max-width: 1000px) {
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const StyleIconContainer = styled.div`
  display: flex;
  margin: 0px 25px;
`;

const StyleFacebookIcon = styled.img`
  margin: auto;
  width: 40px;

  @media only screen and (max-width: 1000px) {
    width: 20px;
  }
`;

const StyleType = styled.div`
  margin-left: 20px;
`;

const StyleGoogleLogin = styled.div`
  background-color: #e65f5c;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 30px;
  color: white;
  border: 2px solid #c90202;
  cursor: pointer;

  @media only screen and (max-width: 1000px) {
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const StyleSubtitle = styled.div`
  text-align: center;
  color: #03071e;
  border-bottom: 2px solid #757bc8;
  padding: 10px;
  margin-bottom: 20px;
`;

const StyleErrorMessage = styled.div`
  font-size: 1.5rem;
  width: fit-content;
  height: fit-content;
  color: red;
  margin: 5px auto 0 auto;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const Signin = () => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(identity);

  const db = firebase.firestore();
  const teachersRef = db.collection("teachers");
  const studentsRef = db.collection("students");

  const handleThirdPartySignin = async (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (
          !teachersRef.doc(res.user.email) &&
          !studentsRef.doc(res.user.email)
        ) {
          history.push("/profile");
          dispatch(changeSignPage(false));
          dispatch(getIdentity(null));
        } else {
          history.push("/profile");
          dispatch(changeSignPage(false));
        }
      })
      .catch((error) => {
        console.log(error);

        // switch (error.code) {
        //   case "auth/email-already-in-use":
        //     setErrorMessage("信箱已存在");
        //     break;
        //   case "auth/invalid-email":
        //     setErrorMessage("");
        //     setErrorMessage("信箱格式不正確");
        //     break;
        //   case "auth/weak-password":
        //     setErrorMessage("");
        //     setErrorMessage("密碼強度不足");
        //     break;
        //   default:
        // }
      });
  };

  const handleNativeSignin = () => {
    const res = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push("/profile");
        dispatch(changeSignPage(false));
        return res.user;
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("信箱不存在");
            break;
          case "auth/invalid-email":
            setErrorMessage("信箱格式不正確");
            break;
          case "auth/wrong-password":
            setErrorMessage("密碼錯誤");
            break;
          default:
        }
      });
    console.log(res);
  };

  return (
    <StyleSignin>
      <StyleSubtitle>登入</StyleSubtitle>
      <StyleForm>
        <StyleInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          required
        />
        <StyleInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="密碼"
          required
        />
        {<StyleErrorMessage>{errorMessage}</StyleErrorMessage>}

        <StyleButton onClick={handleNativeSignin} type="button">
          登入
        </StyleButton>
      </StyleForm>

      <StyleSeperator>或</StyleSeperator>

      <StyleFacebookLogin
        onClick={() => handleThirdPartySignin(facebookProvider)}>
        <StyleIconContainer>
          <StyleFacebookIcon src={facebook} alt="facebook" />
        </StyleIconContainer>
        <StyleType>使用 Facebook 登入</StyleType>
      </StyleFacebookLogin>

      <StyleGoogleLogin onClick={() => handleThirdPartySignin(googleProvider)}>
        <StyleIconContainer>
          <StyleFacebookIcon src={google} alt="google" />
        </StyleIconContainer>
        <StyleType>使用 Google 登入</StyleType>
      </StyleGoogleLogin>
    </StyleSignin>
  );
};

export default Signin;
