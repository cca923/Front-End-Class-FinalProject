import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

import noPhoto from "../../../../../../../images/no-photo-square.png";

const StyleResumeLayer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #979797;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 20000;
`;

const StyleResumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 20000;
  overflow-y: scroll;
  width: calc(100vw - 200px);
  height: calc(100vh - 160px);
  position: fixed;
  top: 0;
  left: 0;
  margin: 80px 100px;

  @media only screen and (max-width: 1100px) {
    margin: 80px 20px;
    width: calc(100vw - 40px);
  }
`;

const StyleMyResume = styled.div`
  background-color: white;
`;

const StyleAbout = styled.div`
  background-color: #e9e9e9;
  padding: 20px;
  display: flex;
`;

const StyleOthers = styled.div`
  padding: 20px;
  display: flex;
`;

const StyleImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: #f2f2f2;
  object-fit: cover;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const StyleDetail = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);

  @media only screen and (max-width: 800px) {
    padding: 0;
    width: 100%;
  }
`;
const StyleIdentityArea = styled.div`
  display: flex;
  vertical-align: bottom;
`;

const StyleName = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-right: 20px;

  @media only screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const StyleEmail = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;

  @media only screen and (max-width: 800px) {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
`;

const StyleAreaTitle = styled.h1`
  margin: 20px 0 0px 0;
`;

const StyleCustomDisplay = styled.div`
  display: inline-block;
  word-wrap: break-word;
  max-width: 100%;
  resize: none;
  margin: 10px 0px;
  line-height: 1.3rem;
`;

const StyleReactQuillDisplay = styled.div`
  min-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  line-height: 1.6rem;
  padding: 10px 30px;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }

  @media only screen and (max-width: 1100px) {
    padding: 0 10px;
  }
`;

const Resume = ({ setDisplayResume, eachStudentData }) => {
  return (
    <>
      <StyleResumeLayer
        onClick={() => {
          setDisplayResume(false);
        }}
      />
      <StyleResumeContainer>
        <StyleMyResume>
          <StyleAbout>
            <StyleImage
              src={eachStudentData.photo || noPhoto}
              alt={eachStudentData.name}
            />
            <StyleDetail>
              <StyleIdentityArea>
                <StyleName>{eachStudentData.name}</StyleName>
                <StyleEmail>{eachStudentData.email}</StyleEmail>
              </StyleIdentityArea>
              <StyleAreaTitle>About</StyleAreaTitle>
              <StyleCustomDisplay>
                {eachStudentData.resume?.about || "該用戶尚未編輯過履歷"}
              </StyleCustomDisplay>
            </StyleDetail>
          </StyleAbout>
          <StyleOthers>
            <StyleReactQuillDisplay>
              {ReactHtmlParser(
                eachStudentData.resume?.detail || "該用戶尚未編輯過履歷"
              )}
            </StyleReactQuillDisplay>
          </StyleOthers>
        </StyleMyResume>
      </StyleResumeContainer>
    </>
  );
};

export default Resume;
