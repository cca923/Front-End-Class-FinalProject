import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "../../../../../utils/config/firebase-config";

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
  const identityData = useSelector((state) => state.identityData);
  const aboutData = identityData.about;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [presentCompany, setPresentCompany] = useState("");
  const [presentTitle, setPresentTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [displayAbout, setDisplayAbout] = useState(false);

  const handleAboutDisplay = () => {
    if (presentCompany === "" && presentTitle === "" && introduction === "") {
      window.alert("請輸入個人資料與介紹！");
    } else {
      const about = {
        presentCompany: presentCompany,
        presentTitle: presentTitle,
        introduction: introduction,
      };
      teachersRef.update({ about }).then(() => {
        setDisplayAbout(true);
        setPresentCompany("");
        setPresentTitle("");
        setIntroduction("");
      });
    }
  };

  useEffect(() => {
    // 初始狀態
    if (aboutData) {
      setDisplayAbout(true);
    }
  }, [aboutData]);

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
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              type="textarea"
              maxLength="200"
              placeholder="請輸入個人介紹(限200字)"
              required
            />
          </StyleAboutContainer>
          <StyleTagSubmitButton onClick={handleAboutDisplay}>
            {displayAbout ? "更新" : "送出"}簡介
          </StyleTagSubmitButton>
          {displayAbout ? (
            <StyleDisplay>
              <StyleAboutDisplay>
                <StyleAboutJobData>
                  <StyleAboutLabel>現職公司｜Present Company</StyleAboutLabel>
                  <StyleAboutValue>{aboutData.presentCompany}</StyleAboutValue>
                </StyleAboutJobData>
                <StyleAboutJobData>
                  <StyleAboutLabel>現職稱謂｜Present Title</StyleAboutLabel>
                  <StyleAboutValue>{aboutData.presentTitle}</StyleAboutValue>
                </StyleAboutJobData>
                <StyleAboutData>
                  <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
                  <StyleAboutMeData>{aboutData.introduction}</StyleAboutMeData>
                </StyleAboutData>
              </StyleAboutDisplay>
            </StyleDisplay>
          ) : null}
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherAbout>
  );
};

export default TeacherAbout;
