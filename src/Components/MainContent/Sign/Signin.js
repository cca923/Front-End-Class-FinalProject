import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { changeSignLoading, getIdentity } from "../../../Redux/Action";
import {
  facebookProvider,
  googleProvider,
  nativeUserSignin,
  fetchStudentData,
  fetchTeacherData,
  userSignOut,
} from "../../../utils/firebase";
import { wrongIdentitySigninAlert } from "../../../utils/swal";
import {
  StyleFacebookLoginButton,
  StyleGoogleLoginButton,
  StylePurpleButton,
} from "../../Common/button";

import facebook from "../../../images/facebook.png";
import google from "../../../images/google.png";

const StyleSignin = styled.div`
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  border-radius: 0px 15px 15px 15px;
  background-color: white;
  padding: 25px;
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
  margin: 2px 0;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    padding: 10px;
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

const StyleSubtitle = styled.div`
  font-weight: 600;
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

const Signin = ({
  closeSignFeature,
  thirdPartyErrorMessage,
  handleThirdPartySign,
}) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNativeSignin = async () => {
    dispatch(changeSignLoading(true));

    try {
      await nativeUserSignin(email, password);

      if (identity === "student") {
        const teacherDoc = await fetchTeacherData(email);
        if (teacherDoc.exists) {
          await userSignOut();
          closeSignFeature();
          dispatch(getIdentity(""));
          await wrongIdentitySigninAlert("老師");
        } else {
          closeSignFeature();
          history.push("/profile/myresume");
        }
      } else if (identity === "teacher") {
        const studentDoc = await fetchStudentData(email);
        if (studentDoc.exists) {
          await userSignOut();
          closeSignFeature();
          dispatch(getIdentity(""));
          await wrongIdentitySigninAlert("學生");
        } else {
          closeSignFeature();
          history.push("/profile/myprofile");
        }
      }
    } catch (error) {
      dispatch(changeSignLoading(false));

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
    }
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
        {<StyleErrorMessage>{thirdPartyErrorMessage}</StyleErrorMessage>}
        {<StyleErrorMessage>{errorMessage}</StyleErrorMessage>}

        <StyleButton onClick={handleNativeSignin} type="button">
          登入
        </StyleButton>
      </StyleForm>

      <StyleSeperator>或</StyleSeperator>

      <StyleFacebookLoginButton
        onClick={() => handleThirdPartySign(facebookProvider)}>
        <StyleIconContainer>
          <StyleFacebookIcon src={facebook} alt="facebook" />
        </StyleIconContainer>
        <StyleType>使用 Facebook 登入</StyleType>
      </StyleFacebookLoginButton>

      <StyleGoogleLoginButton
        onClick={() => handleThirdPartySign(googleProvider)}>
        <StyleIconContainer>
          <StyleFacebookIcon src={google} alt="google" />
        </StyleIconContainer>
        <StyleType>使用 Google 登入</StyleType>
      </StyleGoogleLoginButton>
    </StyleSignin>
  );
};

export default Signin;
