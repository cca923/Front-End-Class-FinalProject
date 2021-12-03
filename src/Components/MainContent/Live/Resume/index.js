import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

import noPhoto from "../../../../images/no-photo-square.png";

import Editor from "./Editor";

const StyleResume = styled.div`
  width: calc(100vw - 410px);
  margin: 20px;
  background-color: #fff;

  @media only screen and (max-width: 950px) {
    width: 95%;
    margin: 20px auto;
  }
`;

const StyleMyResume = styled.div`
  width: 100%;
  background-color: white;
`;

const StyleAbout = styled.div`
  background-color: #e9e9e9;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const StyleOthers = styled.div`
  height: calc(100vh - 370px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  @media only screen and (max-width: 950px) {
    height: fit-content;
  }
`;

const StyleImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: #f2f2f2;
  object-fit: cover;
`;

const StyleDetail = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);
  min-width: 300px;

  @media only screen and (max-width: 650px) {
    margin-top: 15px;
    padding-left: 0;
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
  letter-spacing: 1.2px;

  @media only screen and (max-width: 1120px) {
    font-size: 1.5rem;
  }
`;

const StyleEmail = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;

  @media only screen and (max-width: 1120px) {
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
  max-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  line-height: 1.6rem;
  padding: 10px;
  word-wrap: break-word;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }

  @media only screen and (max-width: 650px) {
    padding: 0;
  }
`;

const Resume = () => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);
  const liveData = useSelector((state) => state.liveData);

  return (
    <StyleResume>
      {identity === "teacher" ? (
        <StyleMyResume>
          <StyleAbout>
            <StyleImage src={liveData.photo || noPhoto} alt={liveData.name} />
            <StyleDetail>
              <StyleIdentityArea>
                <StyleName>{liveData.name}</StyleName>
                <StyleEmail>{liveData.email}</StyleEmail>
              </StyleIdentityArea>
              <StyleAreaTitle>About</StyleAreaTitle>
              <StyleCustomDisplay>
                {liveData.resume?.about || "該用戶尚未編輯過履歷"}
              </StyleCustomDisplay>
            </StyleDetail>
          </StyleAbout>

          <StyleOthers>
            <Editor />
          </StyleOthers>
        </StyleMyResume>
      ) : (
        <StyleMyResume>
          <StyleAbout>
            <StyleImage
              src={identityData.photo || noPhoto}
              alt={identityData.name}
            />
            <StyleDetail>
              <StyleIdentityArea>
                <StyleName>{identityData.name}</StyleName>
                <StyleEmail>{identityData.email}</StyleEmail>
              </StyleIdentityArea>
              <StyleAreaTitle>About</StyleAreaTitle>
              <StyleCustomDisplay>
                {identityData.resume?.about || "該用戶尚未編輯過履歷"}
              </StyleCustomDisplay>
            </StyleDetail>
          </StyleAbout>

          <StyleOthers>
            <StyleReactQuillDisplay>
              {ReactHtmlParser(
                identityData.resume?.detail || "該用戶尚未編輯過履歷"
              )}
            </StyleReactQuillDisplay>
          </StyleOthers>
        </StyleMyResume>
      )}
    </StyleResume>
  );
};

export default Resume;
