import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeSignLoading } from "../../../Redux/Action";
import {
  facebookProvider,
  googleProvider,
  nativeUserSignup,
  setNewUserData,
} from "../../../utils/firebase";
import {
  StylePurpleButton,
  StyleFacebookLoginButton,
  StyleGoogleLoginButton,
} from "../../Common/button";

import facebook from "../../../images/facebook.png";
import google from "../../../images/google.png";

const StyleSignup = styled.div`
  font-size: 1.5rem;
  height: fit-content;
  width: 100%;
  border-radius: 0px 15px 15px 15px;
  background-color: white;
  padding: 25px;

  @media only screen and (max-width: 1000px) {
    padding: 20px;
  }
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyleSubtitle = styled.div`
  font-weight: 600;
  text-align: center;
  color: #03071e;
  border-bottom: 2px solid #757bc8;
  padding: 10px;
  margin-bottom: 20px;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const StyleInput = styled.input`
  font-size: 1.5rem;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid rgb(128, 128, 128);
  margin: 2px 0;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    border-radius: 20px;
  }
`;

const StyleButton = styled(StylePurpleButton)`
  width: 100%;
  margin-top: 15px;
  font-size: 1.5rem;
  line-height: 60px;

  @media only screen and (max-width: 1000px) {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 38px;
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

const Signup = ({
  closeSignFeature,
  thirdPartyErrorMessage,
  handleThirdPartySign,
}) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNativeSignup = async () => {
    dispatch(changeSignLoading(true));

    try {
      const userData = await nativeUserSignup(email, password);

      if (identity === "student") {
        await setNewUserData("students", name, userData.user);
        closeSignFeature();
        history.push("/profile/myresume");
      } else if (identity === "teacher") {
        await setNewUserData("teachers", name, userData.user);
        closeSignFeature();
        history.push("/profile/myprofile");
      }
    } catch (error) {
      dispatch(changeSignLoading(false));

      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("信箱已存在");
          break;
        case "auth/invalid-email":
          setErrorMessage("");
          setErrorMessage("信箱格式不正確");
          break;
        case "auth/weak-password":
          setErrorMessage("");
          setErrorMessage("密碼強度不足");
          break;
        default:
      }
    }
  };

  return (
    <StyleSignup>
      <StyleSubtitle>註冊</StyleSubtitle>
      <StyleForm>
        <StyleInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="姓名"
          required
        />
        <StyleInput
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
        {<StyleErrorMessage>{thirdPartyErrorMessage}</StyleErrorMessage>}
        {<StyleErrorMessage>{errorMessage}</StyleErrorMessage>}

        <StyleButton onClick={handleNativeSignup} type="button">
          註冊
        </StyleButton>

        <StyleSeperator>或</StyleSeperator>

        <StyleFacebookLoginButton
          onClick={() => handleThirdPartySign(facebookProvider)}>
          <StyleIconContainer>
            <StyleFacebookIcon src={facebook} alt="facebook" />
          </StyleIconContainer>
          <StyleType>使用 Facebook 註冊</StyleType>
        </StyleFacebookLoginButton>

        <StyleGoogleLoginButton
          onClick={() => handleThirdPartySign(googleProvider)}>
          <StyleIconContainer>
            <StyleFacebookIcon src={google} alt="google" />
          </StyleIconContainer>
          <StyleType>使用 Google 註冊</StyleType>
        </StyleGoogleLoginButton>
      </StyleForm>
    </StyleSignup>
  );
};

export default Signup;
