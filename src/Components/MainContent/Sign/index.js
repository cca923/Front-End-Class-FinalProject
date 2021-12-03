import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  changeSignLoading,
  changeSignPage,
  getIdentity,
} from "../../../Redux/Action";
import {
  setNewUserData,
  signInWithPopup,
  fetchStudentData,
  fetchTeacherData,
  userSignOut,
} from "../../../utils/firebase";
import { wrongIdentitySigninAlert } from "../../../utils/swal";

import loading from "../../../images/loading.gif";

import Identity from "./Identity";
import Signin from "./Signin";
import Signup from "./Signup";

const StyleSignLayer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #979797;
  opacity: 0.5;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 1100;
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
  z-index: 1200;

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
  background-image: ${(props) =>
    props.signin
      ? "linear-gradient(180deg, #fff, #fff)"
      : "linear-gradient(180deg, #867aff, #6055c6);"};
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
  background-image: ${(props) =>
    props.signup
      ? "linear-gradient(180deg, #fff, #fff)"
      : "linear-gradient(180deg, #867aff, #6055c6);"};

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

const StyleStateWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #979797;
  opacity: 0.6;
  position: fixed;
  top: 0;
  display: ${(props) => (props.signLoading ? "flex" : "none")};
  z-index: 1300;
`;

const StyleLoading = styled.img`
  width: 50%;
  margin: auto;
  height: 350px;
  object-fit: cover;
`;

const Sign = () => {
  const identity = useSelector((state) => state.identity);
  const signLoading = useSelector((state) => state.signLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [thirdPartyErrorMessage, setThirdPartyErrorMessage] = useState("");

  const closeSignFeature = () => {
    dispatch(changeSignLoading(false));
    dispatch(changeSignPage(false));
  };

  const handleThirdPartySign = async (provider) => {
    dispatch(changeSignLoading(true));

    try {
      const userData = await signInWithPopup(provider);

      if (identity === "student") {
        const teacherDoc = await fetchTeacherData(userData.user.email);
        if (teacherDoc.exists) {
          await userSignOut();
          closeSignFeature();
          dispatch(getIdentity(""));
          await wrongIdentitySigninAlert("老師");
        } else {
          if (userData.additionalUserInfo.isNewUser) {
            await setNewUserData(
              "students",
              userData.user.displayName,
              userData.user
            );
            closeSignFeature();
            history.push("/profile/myresume");
          } else {
            closeSignFeature();
            history.push("/profile/myresume");
          }
        }
      } else if (identity === "teacher") {
        const studentDoc = await fetchStudentData(userData.user.email);
        if (studentDoc.exists) {
          await userSignOut();
          closeSignFeature();
          dispatch(getIdentity(""));
          await wrongIdentitySigninAlert("學生");
        } else {
          if (userData.additionalUserInfo.isNewUser) {
            await setNewUserData(
              "teachers",
              userData.user.displayName,
              userData.user
            );
            closeSignFeature();
            history.push("/profile/myprofile");
          } else {
            closeSignFeature();
            history.push("/profile/myprofile");
          }
        }
      }
    } catch (error) {
      dispatch(changeSignLoading(false));

      switch (error.code) {
        case "auth/email-already-in-use":
          setThirdPartyErrorMessage("信箱已存在");
          break;
        case "auth/invalid-email":
          setThirdPartyErrorMessage("信箱格式不正確");
          break;
        case "auth/weak-password":
          setThirdPartyErrorMessage("密碼強度不足");
          break;
        case "auth/user-not-found":
          setThirdPartyErrorMessage("信箱不存在");
          break;
        case "auth/wrong-password":
          setThirdPartyErrorMessage("密碼錯誤");
          break;
        case "auth/account-exists-with-different-credential":
          setThirdPartyErrorMessage("信箱相同但用不同登入方式的帳戶已存在");
          break;

        default:
      }
    }
  };

  return (
    <>
      <StyleStateWrap signLoading={signLoading}>
        <StyleLoading src={loading} alt="Loading" />
      </StyleStateWrap>

      <StyleSignLayer
        onClick={() => {
          dispatch(changeSignPage(false));
          dispatch(getIdentity(""));
        }}></StyleSignLayer>

      {identity.length === 0 ? (
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
          {signin ? (
            <Signin
              closeSignFeature={closeSignFeature}
              thirdPartyErrorMessage={thirdPartyErrorMessage}
              handleThirdPartySign={handleThirdPartySign}
            />
          ) : (
            <Signup
              closeSignFeature={closeSignFeature}
              thirdPartyErrorMessage={thirdPartyErrorMessage}
              handleThirdPartySign={handleThirdPartySign}
            />
          )}
        </StyleSignContainer>
      )}
    </>
  );
};

export default Sign;
