import React from "react";
import styled from "styled-components";
import Resume from "./Resume/index";
import Video from "./Video";

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #c4bccf;
`;

const StyleMainArea = styled.div`
  display: flex;
`;

const Live = () => {
  return (
    <>
      <StyleHeaderArea />
      <StyleMainArea>
        <Video />
        <Resume />
      </StyleMainArea>
    </>
  );
};

export default Live;
