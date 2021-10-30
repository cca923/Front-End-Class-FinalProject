import React from "react";
import styled from "styled-components";

const StyleGroupTeachers = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 30px;
  margin: 0 auto;
  padding: 50px 40px;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
    padding: 40px;
  }
`;

const StyleEachTeacher = styled.a`
  width: 100%;
  height: fit-content;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media only screen and (max-width: 1020px) {
    height: fit-content;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 780px) {
    height: fit-content;
    flex-direction: column;
  }

  @media only screen and (max-width: 650px) {
    height: fit-content;
    /* flex-direction: column; */
  }
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: grey;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0;

  @media only screen and (max-width: 1020px) {
    width: fit-content;
    padding: 10px 0 0 30px;
  }

  @media only screen and (max-width: 780px) {
    padding: 15px 0;
  }
`;

const StyleAbout = styled.div`
  display: flex;
`;

const StyleAboutDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const StyleName = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding-left: 8px;
`;

const StyleCompany = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  border-left: 2px solid #7678ed;
  padding-left: 8px;
`;

const StyleData = styled.span`
  font-size: 1rem;
  margin-top: 10px;
  border-left: 2px solid #7678ed;
  padding-left: 8px;
`;

const StyleTagDisplayArea = styled.div`
  display: flex;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    margin-top: 15px;
  }

  @media only screen and (max-width: 780px) {
    margin-top: 0;
  }
`;

const StyleTag = styled.div`
  background-color: #bbadff;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin-right: 10px;

  @media only screen and (max-width: 1020px) {
    width: fit-content;
    margin: 0;
    margin-right: 10px;
  }
`;

const StyleValue = styled.div`
  line-height: 20px;
`;

const GroupTeachers = (props) => {
  return (
    <StyleGroupTeachers>
      <StyleEachTeacher>
        <StyleAbout>
          <StyleImage alt={"name"} />
          <StyleAboutDetail>
            <StyleName>Anna</StyleName>
            <StyleCompany>AppWorks School</StyleCompany>
            <StyleCompany>Front-End Teacher</StyleCompany>
          </StyleAboutDetail>
        </StyleAbout>

        <StyleDetail>
          <StyleData>擁有平面、UI、產品，至 UX 設計多元跨域經驗</StyleData>
          <StyleData>現職東京跨國企業，兼設計內容媒體 AAPD 創辦人</StyleData>
          <StyleData>現職東京跨國企業，兼設計內容媒體 AAPD 創辦人</StyleData>
        </StyleDetail>

        <StyleTagDisplayArea>
          <StyleTag>
            <StyleValue>Fuck</StyleValue>
          </StyleTag>
          <StyleTag>
            <StyleValue>Fuck</StyleValue>
          </StyleTag>
          <StyleTag>
            <StyleValue>Fuck</StyleValue>
          </StyleTag>
        </StyleTagDisplayArea>
      </StyleEachTeacher>
    </StyleGroupTeachers>
  );
};

export default GroupTeachers;
