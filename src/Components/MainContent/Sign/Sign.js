import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSignLoading,
  changeSignPage,
  getIdentity,
} from "../../../Redux/Action";
import Swal from "sweetalert2";
import firebase from "../../../utils/config/firebase-config";

import styled from "styled-components";
import Signin from "./Signin";
import Signup from "./Signup";
import Identity from "./Identity";
import loading from "../../../images/loading.gif";

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

const Sign = (props) => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);
  const signLoading = useSelector((state) => state.signLoading);

  const dispatch = useDispatch();
  const history = useHistory();
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [thirdPartyErrorMessage, setThirdPartyErrorMessage] = useState("");

  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const teachersCollection = db.collection("teachers");

  const handleThirdPartySign = async (provider) => {
    dispatch(changeSignLoading(true)); // 開啟 loading

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
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    dispatch(changeSignLoading(false));
                    dispatch(changeSignPage(false));
                    dispatch(getIdentity(""));
                    Swal.fire({
                      title: "此 Email 註冊為老師",
                      html: `<h3>請選擇以老師身份登入！</h3>`,
                      icon: "warning",
                      customClass: {
                        confirmButton: "confirm__button",
                      },
                    });
                  });
              } else {
                // 確認是否已有學生帳號
                studentsCollection
                  .doc(res.user.email)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      // 有就導向會員頁面
                      dispatch(changeSignLoading(false)); // 關掉 loading
                      dispatch(changeSignPage(false)); // 關掉 sign 視窗
                      history.push("/profile/myresume"); // 導向會員頁面
                    } else {
                      // 沒有就建立新帳號！
                      const student = studentsCollection.doc(res.user.email);
                      const data = {
                        name: res.user.displayName,
                        email: res.user.email,
                      };
                      student.set(data).then(() => {
                        dispatch(changeSignLoading(false));
                        dispatch(changeSignPage(false));
                        history.push("/profile/myresume");
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
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    dispatch(changeSignLoading(false));
                    dispatch(changeSignPage(false));
                    dispatch(getIdentity(""));
                    Swal.fire({
                      title: "此 Email 註冊為學生",
                      html: `<h3>請選擇以學生身份登入！</h3>`,
                      icon: "warning",
                      customClass: {
                        confirmButton: "confirm__button",
                      },
                    });
                  });
              } else {
                // 確認是否已有老師帳號
                teachersCollection
                  .doc(res.user.email)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      // 有就導向會員頁面
                      dispatch(changeSignLoading(false)); // 關掉 loading
                      dispatch(changeSignPage(false)); // 關掉 sign 視窗
                      history.push("/profile/myprofile"); // 導向會員頁面
                    } else {
                      // 沒有就建立新帳號！
                      const teacher = teachersCollection.doc(res.user.email);
                      const data = {
                        name: res.user.displayName,
                        email: res.user.email,
                      };
                      teacher.set(data).then(() => {
                        dispatch(changeSignLoading(false));
                        dispatch(changeSignPage(false));
                        history.push("/profile/myprofile");
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
      <StyleStateWrap signLoading={signLoading}>
        <StyleLoading src={loading} alt={"Loading"} />
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
