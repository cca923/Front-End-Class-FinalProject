import React from "react";
import styled from "styled-components";

import noResult from "../images/noResult.gif";

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #7367f0;
`;

const StyleStateWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyleNoResult = styled.img`
  width: 30%;
  margin: 20px auto 0;
  object-fit: cover;
`;

const StyleNpResultText = styled.div`
  width: 100%;
  margin: 10px auto;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #343434;

  @media only screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const NoMatch = () => {
  return (
    <>
      <StyleHeaderArea />
      <StyleStateWrap>
        <StyleNoResult src={noResult} alt={"No Result"} />
        <StyleNpResultText>Not Found｜找不到資料</StyleNpResultText>
      </StyleStateWrap>
    </>
  );
};

export default NoMatch;
