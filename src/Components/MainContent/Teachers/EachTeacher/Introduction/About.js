import React from "react";
import styled from "styled-components";

import noPhoto from "../../../../../images/no-photo.png";

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 30px 0 40px;
`;

const StyleTeacher = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #fff;
  border-radius: 25px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
`;

const StyleImage = styled.img`
  width: 150px;
  min-width: 150px;
  height: 150px;
  background-color: #e1e1e1;
  border-radius: 50% 50% 50% 3px;
  margin: auto 20px auto 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px;
  display: inline-block;
  object-fit: cover;

  @media only screen and (max-width: 1300px) {
    width: 100px;
    min-width: 100px;
    height: 100px;
  }
`;

const StyleAbout = styled.div`
  display: flex;

  @media only screen and (max-width: 1000px) {
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const StyleAboutDetail = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
  padding-right: 20px;
  border-right: 2px solid #c4bccf;

  @media only screen and (max-width: 1300px) {
    min-width: 220px;
    border-right: 2px solid #c4bccf;
  }

  @media only screen and (max-width: 1000px) {
    border-right: 0;
    width: calc(100% - 200px);
  }

  @media only screen and (max-width: 650px) {
    min-width: 220px;
    margin-left: 5px;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const StyleName = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  padding-left: 8px;

  @media only screen and (max-width: 1300px) {
    font-size: 1.8rem;
    font-weight: 600;
    padding-left: 8px;
  }
`;

const StyleCompany = styled.div`
  font-size: 1.5rem;
  margin-top: 15px;
  border-left: 2px solid #7367f0;
  padding-left: 8px;

  @media only screen and (max-width: 1300px) {
    font-size: 1.2rem;
    margin-top: 10px;
    border-left: 2px solid #7367f0;
    padding-left: 8px;
  }
`;

const StyleAboutLabel = styled.div`
  padding: 5px 0;
  color: #898292;
  font-size: 1.5rem;
  font-weight: 800;

  @media only screen and (max-width: 1300px) {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const StyleAboutData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  padding-left: 20px;

  @media only screen and (max-width: 1300px) {
    padding: 5px 0;
    padding-left: 20px;
  }

  @media only screen and (max-width: 1000px) {
    padding: 25px 0 0;
    width: 100%;
  }
`;

const StyleAboutMeData = styled.div`
  max-width: 100%;
  height: fit-content;
  word-wrap: break-word;
  padding-top: 5px;
  font-size: 1.2rem;
  margin-top: 10px;
  line-height: 1.8rem;

  @media only screen and (max-width: 1800px) {
    min-width: 100px;
  }

  @media only screen and (max-width: 1300px) {
    font-size: 1rem;
    margin-top: 0px;
    line-height: 1.5rem;
  }
`;

const About = ({ eachTeacherData }) => {
  return (
    <StyleEachDetail>
      <StyleTeacher>
        <StyleAbout>
          <StyleImage
            src={eachTeacherData.photo || noPhoto}
            alt={eachTeacherData.name}
          />
          <StyleAboutDetail>
            <StyleName>{eachTeacherData.name}</StyleName>
            <StyleCompany>{eachTeacherData.about.presentCompany}</StyleCompany>
            <StyleCompany>{eachTeacherData.about.presentTitle}</StyleCompany>
          </StyleAboutDetail>
          <StyleAboutData>
            <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
            <StyleAboutMeData>
              {eachTeacherData.about.introduction}
            </StyleAboutMeData>
          </StyleAboutData>
        </StyleAbout>
      </StyleTeacher>
    </StyleEachDetail>
  );
};

export default About;
