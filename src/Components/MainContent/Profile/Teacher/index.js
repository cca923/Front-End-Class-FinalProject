import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import TeacherMyClass from "./MyClass/index";
import TeacherMyProfile from "./MyProfile/index";

const StyleTeacherMainArea = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const TeacherMainArea = (props) => {
  return (
    <StyleTeacherMainArea>
      <Switch>
        <Route path="/profile/myclass" exact>
          <TeacherMyClass />
        </Route>
        <Route path="/profile/myprofile" exact>
          <TeacherMyProfile />
        </Route>
      </Switch>
    </StyleTeacherMainArea>
  );
};

export default TeacherMainArea;
