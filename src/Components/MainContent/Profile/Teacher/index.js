import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import TeacherMyClass from "./MyClass/index";
import TeacherMyProfile from "./MyProfile/index";

const StyleTeacherMainArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const TeacherMainArea = () => {
  return (
    <StyleTeacherMainArea>
      <Switch>
        <Route path="/profile/myclass" exact>
          <TeacherMyClass />
        </Route>
        <Route path="/profile/myprofile" exact>
          <TeacherMyProfile />
        </Route>
        <Route path="">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </StyleTeacherMainArea>
  );
};

export default TeacherMainArea;
