import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "./utils/config/firebase-config";
import { useSelector } from "react-redux";
import Sign from "./Components/MainContent/Sign/Sign";
import Home from "./Components/MainContent/Home";
import Live from "./Components/MainContent/Live";
import Header from "./Components/Header/Header";
import Profile from "./Components/MainContent/Profile";
import Teachers from "./Components/MainContent/Teachers";
import EachTeacher from "./Components/MainContent/Teachers/EachTeacher/index";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
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
          {user ? (
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
