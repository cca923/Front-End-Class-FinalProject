import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "./utils/config/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity, getStudentData, getTeacherData } from "./Redux/Action";
import Sign from "./Components/MainContent/Sign/Sign";
import Home from "./Components/MainContent/Home";
import Live from "./Components/MainContent/Live/index";
import Header from "./Components/Header/Header";
import Profile from "./Components/MainContent/Profile";
import Teachers from "./Components/MainContent/Teachers";
import EachTeacher from "./Components/MainContent/Teachers/EachTeacher/index";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const identityData = useSelector((state) => state.identityData);
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();

  const db = firebase.firestore();

  const [currentUser, setCurrentUser] = useState(null);
  // console.log(identityData);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setCurrentUser(currentUser);

      const teachersRef = db.collection("teachers").doc(currentUser.email);
      const studentsRef = db.collection("students").doc(currentUser.email);

      teachersRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            teachersRef.onSnapshot((doc) => {
              dispatch(getTeacherData(doc.data()));
              console.log("老師資料", doc.data());
            });
          }
        })
        .catch((error) => {
          console.log("資料讀取有誤：", error);
        });

      studentsRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            studentsRef.onSnapshot((doc) => {
              dispatch(getStudentData(doc.data()));
              console.log("學生資料", doc.data());
            });
          }
        })
        .catch((error) => {
          console.log("資料讀取有誤：", error);
        });
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
          {currentUser ? (
            <>
              <Route path="/teachers" exact>
                <Teachers />
              </Route>
              <Route path="/teachers/:teacherUid" exact>
                <EachTeacher />
              </Route>
              <Route path="/live">
                <Live />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
            </>
          ) : null}
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
