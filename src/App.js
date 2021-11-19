import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity, getStudentData, getTeacherData } from "./Redux/Action";
import firebase from "./utils/config/firebase-config";
import Sign from "./Components/MainContent/Sign/Sign";
import Home from "./Components/MainContent/Home";
import Live from "./Components/MainContent/Live/index";
import Header from "./Components/Header/Header";
import Profile from "./Components/MainContent/Profile";
import Teachers from "./Components/MainContent/Teachers";
import EachTeacher from "./Components/MainContent/Teachers/EachTeacher/index";
import ScrollToTop from "./Components/ScrollToTop";
import NoMatch from "./Components/NoMatch";
import loading from "./images/loading.gif";

const StyleStateWrap = styled.div`
  display: flex;
  width: 100%;
`;

const StyleLoading = styled.img`
  width: 50%;
  margin: 0 auto;
  height: 350px;
  object-fit: cover;
`;

function App() {
  const identityData = useSelector((state) => state.identityData);
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  console.log("目前使用者身份：", identity, "Redux: Email", identityData.email);
  // 判斷登錯身份，會登出 auth，但 Redux 沒有清空 (currentUser 無，identityData 有)！

  const db = firebase.firestore();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);
      // console.log(currentUser);

      const teachersRef = db.collection("teachers").doc(currentUser.email);
      const studentsRef = db.collection("students").doc(currentUser.email);

      db.collection("teachers")
        .where("email", "==", currentUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              dispatch(getIdentity("teacher"));

              teachersRef.onSnapshot((doc) => {
                if (doc.data().email === currentUser.email) {
                  dispatch(getTeacherData(doc.data()));
                  console.log("老師資料", doc.data());
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("資料讀取錯誤", error);
        });

      // db.collection("students")
      //   .where("email", "==", currentUser.email)
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       dispatch(getIdentity("student"));
      //       console.log("是學生");
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("資料讀取錯誤", error);
      //   });

      // db.collection("teachers")
      //   .where("email", "==", currentUser.email)
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       dispatch(getIdentity("teacher"));
      //       console.log("是老師");
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("資料讀取錯誤", error);
      //   });

      db.collection("students")
        .where("email", "==", currentUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              dispatch(getIdentity("student"));

              if (doc.data().email === currentUser.email) {
                studentsRef.onSnapshot((doc) => {
                  dispatch(getStudentData(doc.data()));
                  console.log("學生資料", doc.data());
                });
              }
            }
          });
        })
        .catch((error) => {
          console.log("資料讀取錯誤", error);
        });

      // teachersRef
      //   .get()
      //   .then((doc) => {
      //     if (doc.exists) {
      //       teachersRef.onSnapshot((doc) => {
      //         dispatch(getTeacherData(doc.data()));
      //         console.log("老師資料", doc.data());
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("資料讀取有誤：", error);
      //   });

      // studentsRef
      //   .get()
      //   .then((doc) => {
      //     if (doc.exists) {
      //       studentsRef.onSnapshot((doc) => {
      //         dispatch(getStudentData(doc.data()));
      //         console.log("學生資料", doc.data());
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("資料讀取有誤：", error);
      //   });
    });
  }, []);

  const signPage = useSelector((state) => state.signPage);

  return (
    <>
      <Header />
      {signPage ? <Sign /> : null}

      <ScrollToTop>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          {currentUser !== null ? (
            <>
              {currentUser !== undefined ? (
                <>
                  <Route path="/teachers" exact>
                    <Teachers />
                  </Route>
                  <Route path="/teachers/:teacherUid" exact>
                    <EachTeacher />
                  </Route>
                  <Route path="/live" exact>
                    <Live />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>

                  <Route component={NoMatch} exact />
                  {/* <Redirect to="/404" /> */}
                </>
              ) : (
                <StyleStateWrap>
                  <StyleLoading src={loading} alt={"Loading"} />
                </StyleStateWrap>
              )}
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
