import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import StudentMyResume from "./StudentMyResume";
import StudentMyClass from "./StudentMyClass";

const StyleStudentMainArea = styled.div`
  width: 100%;
  background-color: white;
`;

const StudentMainArea = (props) => {
  return (
    <StyleStudentMainArea>
      <Switch>
        <Route path="/profile/myclass" exact>
          <StudentMyClass />
        </Route>
        <Route path="/profile/myresume" exact>
          <StudentMyResume />
        </Route>
      </Switch>
    </StyleStudentMainArea>
  );
};

export default StudentMainArea;
