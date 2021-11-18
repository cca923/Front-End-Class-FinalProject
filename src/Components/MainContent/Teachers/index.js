import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import GroupTeachers from "./GroupTeachers";
import headerImage from "../../../images/theme/theme-16.png";

const StyleHeaderArea = styled.div`
  display: flex;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const StyleImageArea = styled.img`
  width: 50vw;
  height: 300px;
  display: inline-flex;
  vertical-align: bottom;
  background-color: #7367f0;
  opacity: 0.8;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  object-fit: cover;
  object-position: top 35% right 0;

  @media only screen and (max-width: 1020px) {
  }

  @media only screen and (max-width: 800px) {
    display: block;
  }

  @media only screen and (max-width: 800px) {
    order: -1;
    width: 100%;
    height: 150px;
  }
`;

const StyleBanner = styled.div`
  display: inline-flex;
  width: 50vw;
  height: 300px;
  background-color: #c4c4c4;
  flex-direction: column;
  vertical-align: bottom;
  position: relative;

  @media only screen and (max-width: 800px) {
    width: 100%;
    height: 150px;
  }
`;

const StyleTitle = styled.div`
  margin: auto auto 0 80px;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #000;

  @media only screen and (max-width: 1500px) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 1020px) {
    margin: auto auto 0 40px;
    font-size: 1.5rem;
  }
`;

const StyleSubtitle = styled.div`
  margin: 20px auto 0 80px;
  font-size: 1.2rem;
  font-weight: 400;
  border-left: 3px solid #fff;
  padding-left: 10px;
  line-height: 30px;

  @media only screen and (max-width: 1500px) {
    font-size: 1.1rem;
  }

  @media only screen and (max-width: 1020px) {
    margin: 10px auto 0 40px;
  }
`;

const StyleCaption = styled.div`
  margin: 10px auto 55px 80px;
  padding-left: 13px;
  font-size: 0.9rem;

  @media only screen and (max-width: 1020px) {
    margin: 5px auto 30px 40px;
  }
`;

const StyleTeachersContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const Teachers = (props) => {
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
  const [displayTag, setDisplayTag] = useState(false);

  return (
    <>
      <StyleHeaderArea>
        <StyleBanner>
          <StyleTitle>一對一視訊＆預約履歷修改</StyleTitle>
          <StyleSubtitle>職涯路上，隨時導航！</StyleSubtitle>
          <StyleCaption>依照目標產業、專業領域，預約適合的人選！</StyleCaption>
        </StyleBanner>
        <StyleImageArea src={headerImage} alt={"header image"} />
      </StyleHeaderArea>

      <StyleTeachersContainer>
        <Sidebar
          selectIndustry={selectIndustry}
          setSelectIndustry={setSelectIndustry}
          selectTitle={selectTitle}
          setSelectTitle={setSelectTitle}
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
          displayTag={displayTag}
          setDisplayTag={setDisplayTag}
        />
        <GroupTeachers
          selectIndustry={selectIndustry}
          setSelectIndustry={setSelectIndustry}
          selectTitle={selectTitle}
          setSelectTitle={setSelectTitle}
          selectLanguage={selectLanguage}
          setSelectLanguage={setSelectLanguage}
          displayTag={displayTag}
          setDisplayTag={setDisplayTag}
        />
      </StyleTeachersContainer>
    </>
  );
};

export default Teachers;
