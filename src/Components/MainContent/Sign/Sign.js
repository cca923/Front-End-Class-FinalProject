import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSignPage,
  getIdentity,
  checkSignStatus,
  getStudentData,
  getTeacherData,
} from "../../../Redux/Action";
import firebase from "../../../utils/config/firebase-config";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [thirdPartyErrorMessage, setThirdPartyErrorMessage] = useState("");

  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const teachersCollection = db.collection("teachers");

  const handleThirdPartySign = async (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (identity === "student") {
          teachersCollection
            .doc(res.user.email)
            .get()
            .then((doc) => {
              if (doc.exists) {
                window.alert("此 Email 註冊為老師，請選擇以老師身份登入！");
                firebase.auth().signOut();
              } else {
                // 確認是否已有學生帳號
                studentsCollection
                  .doc(res.user.email)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      // 有就導向會員頁面

                      // 監聽 firestore 來更新 Redux
                      studentsCollection
                        .doc(res.user.email)
                        .onSnapshot((doc) => {
                          dispatch(getStudentData(doc.data()));
                          console.log("新的學生Data", doc.data());
                        });

                      dispatch(changeSignPage(false)); // 關掉 sign 視窗
                      history.push("/profile/myresume"); // 導向會員頁面
                      dispatch(checkSignStatus(true)); // 改變 Nav
                    } else {
                      // 沒有就建立新帳號！
                      const student = studentsCollection.doc(res.user.email);
                      const data = {
                        name: res.user.displayName,
                        email: res.user.email,
                      };
                      student.set(data).then(() => {
                        dispatch(changeSignPage(false));
                        history.push("/profile/myresume");
                        dispatch(checkSignStatus(true));
                      });

                      // 監聽 firestore 來更新 Redux
                      student.onSnapshot((doc) => {
                        dispatch(getStudentData(doc.data()));
                        console.log("新的學生Data", doc.data());
                      });
                    }
                  })
                  .catch((error) => {
                    console.log("帳號讀取有問題", error);
                  });
              }
            })
            .catch((error) => {
              console.log("帳號讀取有問題", error);
            });
        } else if (identity === "teacher") {
          studentsCollection
            .doc(res.user.email)
            .get()
            .then((doc) => {
              if (doc.exists) {
                window.alert("此 Email 註冊為學生，請選擇以學生身份登入！");
                firebase.auth().signOut();
              } else {
                // 確認是否已有老師帳號
                teachersCollection
                  .doc(res.user.email)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      // 有就導向會員頁面

                      // 監聽 firestore 來更新 Redux
                      teachersCollection
                        .doc(res.user.email)
                        .onSnapshot((doc) => {
                          dispatch(getTeacherData(doc.data()));
                          console.log("新的Data", doc.data());
                        });

                      dispatch(changeSignPage(false)); // 關掉 sign 視窗
                      history.push("/profile/myprofile"); // 導向會員頁面
                      dispatch(checkSignStatus(true)); // 改變 Nav
                    } else {
                      // 沒有就建立新帳號！
                      const teacher = teachersCollection.doc(res.user.email);
                      const data = {
                        name: res.user.displayName,
                        email: res.user.email,
                      };
                      teacher.set(data).then(() => {
                        dispatch(changeSignPage(false));
                        history.push("/profile/myprofile");
                        dispatch(checkSignStatus(true));
                      });

                      // 監聽 firestore 來更新 Redux
                      teacher.onSnapshot((doc) => {
                        dispatch(getTeacherData(doc.data()));
                        console.log("新的Data", doc.data());
                      });
                    }
                  })
                  .catch((error) => {
                    console.log("帳號讀取有問題", error);
                  });
              }
            })
            .catch((error) => {
              console.log("帳號讀取有問題", error);
            });
        }
      })
      .catch((error) => {
        console.log("帳號讀取有問題", error);
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
          default:
        }
      });
  };

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
          {signin ? (
            <Signin
              errorMessage={thirdPartyErrorMessage}
              handleThirdPartySign={handleThirdPartySign}
            />
          ) : (
            <Signup
              errorMessage={thirdPartyErrorMessage}
              handleThirdPartySign={handleThirdPartySign}
            />
          )}
        </StyleSignContainer>
      )}
    </>
  );
};

export default Sign;
