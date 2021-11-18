import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EditArea from "./Editor/EditArea";
import Editor from "./Editor/Editor";
import noPhoto from "../../../../../images/resume-noPhoto.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

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

  @media only screen and (max-width: 1120px) {
    font-size: 1.5rem;
  }
`;

const StyleEmail = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;

  @media only screen and (max-width: 1120px) {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
`;

const StyleAreaTitle = styled.h1`
  margin: 20px 0 0px 0;
`;

const StylePrintButton = styled.div`
  position: absolute;
  right: 20px;
  width: 120px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  line-height: 38px;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

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

const StudentMyResume = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const sendEdit = useRef();
  const [hover, setHover] = useState(false);

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
      <StyleOthers
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}>
        <Editor hover={hover} />
      </StyleOthers>
    </StyleMyResume>
  );
};

export default StudentMyResume;
