import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyleTeacherAbout = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
`;

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #898292;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 250px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #f8f3f8;
  border-top: 2px solid #898292;
  border-radius: 20px;
  padding: 50px 30px 20px 30px;
`;

const StyleAboutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleAboutMeInput = styled.input`
  padding: 5px;
  width: 100%;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;
`;

const StyleAboutMeIntroduction = styled.input`
  padding: 5px;
  width: 100%;
  height: 100px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;
  word-wrap: break-word;
`;

const StyleDisplay = styled.div`
  width: 100%;
`;

const StyleAboutDisplay = styled.div`
  padding: 20px 0;
`;

const StyleAboutJobData = styled.div`
  display: flex;
  padding: 5px 0;

  @media only screen and (max-width: 920px) {
    flex-direction: column;
  }
`;

const StyleAboutLabel = styled.div`
  width: 300px;
  padding: 5px 0;
  color: #898292;
`;
const StyleAboutValue = styled.div`
  width: 100%;
  line-height: 26px;
`;

const StyleAboutData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const StyleAboutMeData = styled.div`
  max-width: 100%;
  height: fit-content;
  word-wrap: break-word;
  padding-top: 5px;
`;

const StyleExperienceLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px;

  @media only screen and (max-width: 1020px) {
    width: 300px;
  }
`;

const StyleTagSubmitButton = styled.div`
  width: 200px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border-radius: 20px;
  border: 2px solid #bbadff;
  padding: 10px;
  margin: 20px auto 0 auto;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }

  @media only screen and (max-width: 1300px) {
  }
`;

const TeacherAbout = (props) => {
  const [presentCompany, setPresentCompany] = useState("");
  const [presentTitle, setPresentTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [displayAbout, setDisplayAbout] = useState(false);
  const [about, setAbout] = useState(null);

  const handleAboutDisplay = () => {
    if (presentCompany === "" && presentTitle === "" && aboutMe === "") {
      window.alert("請輸入個人資料與介紹！");
    } else {
      setDisplayAbout(true);
      const newAbout = [
        {
          presentCompany,
          presentTitle,
          aboutMe,
        },
      ];
      setAbout(newAbout);
      setPresentCompany("");
      setPresentTitle("");
      setAboutMe("");
    }
  };

  return (
    <StyleTeacherAbout>
      <StyleEachDetail>
        <StyleSubtitle>關於我｜About</StyleSubtitle>
        <StyleContainer>
          <StyleAboutContainer>
            <StyleExperienceLabel>
              現職公司｜Present Company
            </StyleExperienceLabel>
            <StyleAboutMeInput
              value={presentCompany}
              onChange={(e) => setPresentCompany(e.target.value)}
              type="text"
              placeholder="請輸入公司名稱"
              required
            />
          </StyleAboutContainer>
          <StyleAboutContainer>
            <StyleExperienceLabel>現職稱謂｜Present Title</StyleExperienceLabel>
            <StyleAboutMeInput
              value={presentTitle}
              onChange={(e) => setPresentTitle(e.target.value)}
              type="text"
              placeholder="請輸入職稱"
              required
            />
          </StyleAboutContainer>
          <StyleAboutContainer>
            <StyleExperienceLabel>個人介紹｜Introduction</StyleExperienceLabel>
            <StyleAboutMeIntroduction
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              type="textarea"
              maxLength="200"
              placeholder="請輸入個人介紹"
              required
            />
          </StyleAboutContainer>
          <StyleTagSubmitButton onClick={handleAboutDisplay}>
            送出
          </StyleTagSubmitButton>
          {displayAbout ? (
            <StyleDisplay>
              {about.map((about) => {
                return (
                  <StyleAboutDisplay>
                    <StyleAboutJobData>
                      <StyleAboutLabel>
                        現職公司｜Present Company
                      </StyleAboutLabel>
                      <StyleAboutValue>{about.presentCompany}</StyleAboutValue>
                    </StyleAboutJobData>
                    <StyleAboutJobData>
                      <StyleAboutLabel>現職稱謂｜Present Title</StyleAboutLabel>
                      <StyleAboutValue>{about.presentTitle}</StyleAboutValue>
                    </StyleAboutJobData>
                    <StyleAboutData>
                      <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
                      <StyleAboutMeData>{about.aboutMe}</StyleAboutMeData>
                    </StyleAboutData>
                  </StyleAboutDisplay>
                );
              })}
            </StyleDisplay>
          ) : null}
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherAbout>
  );
};

export default TeacherAbout;
