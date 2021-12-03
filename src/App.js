import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getIdentity, getStudentData, getTeacherData } from "./Redux/Action";
import {
  onUserChanged,
  fetchTeacherData,
  fetchStudentData,
  teacherSnapshot,
  docRef,
  studentSnapshot,
} from "./utils/firebase";

import loading from "./images/loading.gif";

import Sign from "./Components/MainContent/Sign/index";
import Home from "./Components/MainContent/Home";
import Live from "./Components/MainContent/Live/index";
import Header from "./Components/Header/index";
import Profile from "./Components/MainContent/Profile";
import Teachers from "./Components/MainContent/Teachers";
import EachTeacher from "./Components/MainContent/Teachers/EachTeacher/index";
import ScrollToTop from "./Components/ScrollToTop";
import NoMatch from "./Components/NoMatch";

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
  const signPage = useSelector((state) => state.signPage);
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onUserChanged(async (currentUser) => {
      setCurrentUser(currentUser);

      if (currentUser) {
        const teacherDoc = await fetchTeacherData(currentUser.email);
        if (teacherDoc.exists) {
          dispatch(getIdentity("teacher"));

          teacherSnapshot(
            docRef("teachers", currentUser.email),
            currentUser.email,
            teacherDoc,
            (data) => {
              dispatch(getTeacherData(data));
            }
          );
        }

        const studentDoc = await fetchStudentData(currentUser.email);
        if (studentDoc.exists) {
          dispatch(getIdentity("student"));

          studentSnapshot(
            docRef("students", currentUser.email),
            currentUser.email,
            studentDoc,
            (data) => {
              dispatch(getStudentData(data));
            }
          );
        }
      }
    });
  }, []);

  return (
    <>
      <Header currentUser={currentUser} />
      {signPage ? <Sign /> : null}

      <ScrollToTop>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          {currentUser !== null ? (
            <>
              {currentUser !== undefined ? (
                <Switch>
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
                  <Route path="/404" exact>
                    <NoMatch />
                  </Route>
                  <Route path="">
                    <Redirect to="/404" />
                  </Route>
                </Switch>
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
