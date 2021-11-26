import React from "react";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import StudentMyResume from "./MyResume/index";
import StudentMyClass from "./MyClass/index";

const StyleStudentMainArea = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const StudentMainArea = () => {
  return (
    <StyleStudentMainArea>
      <Switch>
        <Route path="/profile/myclass" exact>
          <StudentMyClass />
        </Route>
        <Route path="/profile/myresume" exact>
          <StudentMyResume />
        </Route>
        <Route path="">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </StyleStudentMainArea>
  );
};

export default StudentMainArea;
