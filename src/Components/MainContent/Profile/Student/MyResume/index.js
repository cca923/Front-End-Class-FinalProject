import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import { StyleWhiteButton } from "../../../../Common/button";

import noPhoto from "../../../../../images/no-photo-square.png";

import EditArea from "./Editor/About";
import Editor from "./Editor/Editor";

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
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media print {
    padding: 10px;
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

  @media only screen and (max-width: 700px) {
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

const StylePrintButton = styled(StyleWhiteButton)`
  position: absolute;
  right: 20px;
  width: 120px;
  line-height: 37px;

  @media only screen and (max-width: 500px) {
    width: 90px;
  }

  @media print {
    display: none;
  }
`;

const StylePrintIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 15px;
  margin-right: 8px;
  cursor: pointer;
`;

const StudentMyResume = () => {
  const identityData = useSelector((state) => state.identityData);
  const sendEdit = useRef();

  return (
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
          <EditArea sendEdit={sendEdit} />
        </StyleDetail>
        <StylePrintButton
          onClick={() => {
            window.print();
          }}>
          <StylePrintIcon icon={faPrint} color="#484C7A" />
          列印
        </StylePrintButton>
      </StyleAbout>

      <StyleOthers>
        <Editor />
      </StyleOthers>
    </StyleMyResume>
  );
};

export default StudentMyResume;
