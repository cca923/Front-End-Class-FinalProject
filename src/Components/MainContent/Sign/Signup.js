import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSignPage } from "../../../Redux/Action";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import Identity from "./Identity";
import {
  facebookProvider,
  googleProvider,
} from "../../../utils/service/authMethod";
import facebook from "../../../images/facebook.png";
import google from "../../../images/google.png";

const StyleSignup = styled.div`
  font-size: 1.5rem;
  height: fit-content;
  width: 100%;
  border-radius: 0px 15px 15px 15px;
  background-color: white;
  padding: 25px;
  z-index: 99;

  @media only screen and (max-width: 1000px) {
    padding: 20px;
  }
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyleSubtitle = styled.div`
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

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
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
    margin-top: 5px;
    border-radius: 20px;
    font-size: 1rem;
    padding: 5px;
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

const Signup = () => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(identity);

  const db = firebase.firestore();
  const teachersRef = db.collection("teachers");
  const studentsRef = db.collection("students");
  // const queryTeacher = teachersRef.where("state", "==", "CA");
  // const queryStudent = studentsRef.where("state", "==", "CA");

  //TODO:加入查看是否 email 已存在的邏輯！
  const handleThirdPartySignup = async (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res.user);
        if (identity === "student") {
          const student = studentsRef.doc(res.user.email);
          const data = {
            name: res.user.displayName,
            email: res.user.email,
          };
          student.set(data);
          history.push("/profile");
          dispatch(changeSignPage(false));
        } else if (identity === "teacher") {
          const teacher = teachersRef.doc(res.user.email);
          const data = {
            name: res.user.displayName,
            email: res.user.email,
          };
          teacher.set(data);
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

  //TODO:加入查看是否 email 已存在的邏輯！
  const handleNativeSignup = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // 串 firestore
        if (identity === "student") {
          const student = db.collection("students").doc(email);
          const data = {
            name,
            email,
          };
          student.set(data);
          history.push("/profile");
          dispatch(changeSignPage(false));
        } else if (identity === "teacher") {
          const teacher = db.collection("teachers").doc(email);
          const data = {
            name,
            email,
          };
          teacher.set(data);
          history.push("/profile");
          dispatch(changeSignPage(false));
        }
      })
      .catch((error) => {
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
      });
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
        <StyleButton onClick={handleNativeSignup} type="button">
          註冊
        </StyleButton>

        <StyleSeperator>或</StyleSeperator>

        <StyleFacebookLogin
          onClick={() => handleThirdPartySignup(facebookProvider)}>
          <StyleIconContainer>
            <StyleFacebookIcon src={facebook} alt="facebook" />
          </StyleIconContainer>
          <StyleType>使用 Facebook 註冊</StyleType>
        </StyleFacebookLogin>

        <StyleGoogleLogin
          onClick={() => handleThirdPartySignup(googleProvider)}>
          <StyleIconContainer>
            <StyleFacebookIcon src={google} alt="google" />
          </StyleIconContainer>
          <StyleType>使用 Google 註冊</StyleType>
        </StyleGoogleLogin>
      </StyleForm>
    </StyleSignup>
  );
};

export default Signup;
