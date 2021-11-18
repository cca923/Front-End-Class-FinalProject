import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeSignLoading, changeSignPage } from "../../../Redux/Action";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
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

const StyleButton = styled.button`
  margin-top: 15px;
  padding: 10px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

  @media only screen and (max-width: 1000px) {
    padding: 10px;
    border-radius: 20px;
    font-size: 1rem;
  }
`;

const StyleFacebookLogin = styled.div`
  background-color: #4267b2;
  background-image: linear-gradient(180deg, #7192d5, #345087);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

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
  background-image: linear-gradient(180deg, #e65f5c, #a94340);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

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

const Signup = (props) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const teachersCollection = db.collection("teachers");

  const handleNativeSignup = async () => {
    dispatch(changeSignLoading(true));

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (identity === "student") {
          const student = studentsCollection.doc(email);
          const data = {
            name,
            email: email,
          };
          student.set(data).then(() => {
            dispatch(changeSignLoading(false));
            dispatch(changeSignPage(false));
            history.push("/profile/myresume");
          });
        } else if (identity === "teacher") {
          const teacher = teachersCollection.doc(email);
          const data = {
            name,
            email: email,
          };
          teacher.set(data).then(() => {
            dispatch(changeSignLoading(false));
            dispatch(changeSignPage(false));
            history.push("/profile/myprofile");
          });
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
        {<StyleErrorMessage>{props.thirdPartyErrorMessage}</StyleErrorMessage>}
        {<StyleErrorMessage>{errorMessage}</StyleErrorMessage>}

        <StyleButton onClick={handleNativeSignup} type="button">
          註冊
        </StyleButton>

        <StyleSeperator>或</StyleSeperator>

        <StyleFacebookLogin
          onClick={() => props.handleThirdPartySign(facebookProvider)}>
          <StyleIconContainer>
            <StyleFacebookIcon src={facebook} alt="facebook" />
          </StyleIconContainer>
          <StyleType>使用 Facebook 註冊</StyleType>
        </StyleFacebookLogin>

        <StyleGoogleLogin
          onClick={() => props.handleThirdPartySign(googleProvider)}>
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
