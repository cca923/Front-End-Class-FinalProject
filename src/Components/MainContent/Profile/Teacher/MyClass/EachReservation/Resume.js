import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import firebase from "../../../../../../utils/config/firebase-config";
import { nanoid } from "nanoid";

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
  position: fixed;
  top: 50%;
  left: 50%;
  width: 96vmin;
  height: 80vmin;
  margin-left: -48vmin;
  margin-top: -40vmin;
  background-color: #fff;
  z-index: 20000;
  overflow-y: scroll;

  @media only screen and (max-width: 1100px) {
    /* width: 350px;
    height: 440px;
    margin-left: -175px;
    margin-top: -220px; */
  }

  @media only screen and (max-width: 600) {
    /* width: 250px;
    height: 440px;
    margin-left: -125px;
    margin-top: -220px; */
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
`;

const StyleOthers = styled.div`
  padding: 20px;
  display: flex;
`;

const StyleImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: gray;

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

const StyleDetail = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);
  /* max-height: calc(100% - 150px); */
  @media only screen and (max-width: 1100px) {
    width: 100%;
    padding: 30px 30px 0px 30px;
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
`;

const StyleEmail = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
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
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  line-height: 1.6rem;
  padding: 30px;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }
`;

const Resume = (props) => {
  console.log(props.studentData);

  return (
    <>
      <StyleResumeLayer
        onClick={() => {
          props.setDisplayResume(false);
        }}
      />
      <StyleResumeContainer>
        <StyleMyResume>
          <StyleAbout>
            <StyleImage
              src={props.studentData.photo}
              alt={props.studentData.name}
            />
            <StyleDetail>
              <StyleIdentityArea>
                <StyleName>{props.studentData.name}</StyleName>
                <StyleEmail>{props.studentData.email}</StyleEmail>
              </StyleIdentityArea>
              <StyleAreaTitle>About</StyleAreaTitle>
              <StyleCustomDisplay>
                {props.studentData.resume.about}
              </StyleCustomDisplay>
            </StyleDetail>
          </StyleAbout>
          <StyleOthers>
            <StyleReactQuillDisplay>
              {ReactHtmlParser(props.studentData.resume.detail)}
            </StyleReactQuillDisplay>
          </StyleOthers>
        </StyleMyResume>
      </StyleResumeContainer>
    </>
  );
};

export default Resume;
