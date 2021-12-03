import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { updateTeacherData } from "../../../../../../utils/firebase";
import { successAlert, warningAlert } from "../../../../../../utils/swal";
import { StyleWhiteButton } from "../../../../../Common/button";
import { StyleSubtitle } from "../../../../../Common/title";

import noPhoto from "../../../../../../images/no-photo.png";

const StyleTeacherAbout = styled.div`
  width: 100%;
  padding: 0 20px;

  @media only screen and (max-width: 660px) {
    padding: 0 3px;
  }
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #f3f3f3;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 50px 30px 20px 30px;
`;

const StyleAboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const StyleExperienceLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px 5px;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const StyleAboutMeInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;
`;

const StyleAboutMeIntroduction = styled.textarea`
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  height: 100px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;
  word-wrap: break-word;
  resize: none;
`;

const StyleDisplay = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const StyleAboutDisplay = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #fff;
  border-radius: 25px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
`;

const StyleImage = styled.img`
  min-width: 150px;
  height: 150px;
  background-color: #e1e1e1;
  border-radius: 50% 50% 50% 3px;
  margin: auto 20px auto 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px;
  object-fit: cover;

  @media only screen and (max-width: 1500px) {
    max-width: 150px;
    display: inline-block;
  }

  @media only screen and (max-width: 1300px) {
    min-width: 100px;
    height: 100px;
  }

  @media only screen and (max-width: 1000px) {
    max-width: 100px;
    height: 100px;
  }
`;

const StyleAbout = styled.div`
  display: flex;

  @media only screen and (max-width: 1500px) {
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 1300px) {
    flex-wrap: nowrap;
  }

  @media only screen and (max-width: 1000px) {
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 600px) {
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

  @media only screen and (max-width: 1500px) {
    border-right: 0;
    width: calc(100% - 200px);
  }

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

  @media only screen and (max-width: 600px) {
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

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
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

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
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

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const StyleAboutData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  padding-left: 20px;

  @media only screen and (max-width: 1500px) {
    padding: 25px 0 0;
    width: 100%;
  }

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

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const StyleTagSubmitButton = styled(StyleWhiteButton)`
  margin: 20px auto 10px;
`;

const TeacherAbout = () => {
  const identityData = useSelector((state) => state.identityData);
  const aboutData = identityData.about;

  const [presentCompany, setPresentCompany] = useState("");
  const [presentTitle, setPresentTitle] = useState("");
  const [introduction, setIntroduction] = useState("");

  const handleAboutDisplay = async () => {
    if (
      presentCompany.length !== 0 &&
      presentTitle.length !== 0 &&
      introduction.length !== 0
    ) {
      const about = {
        presentCompany: presentCompany,
        presentTitle: presentTitle,
        introduction: introduction,
      };
      await updateTeacherData(identityData.email, { about });
      await successAlert("更改成功！");

      setPresentCompany("");
      setPresentTitle("");
      setIntroduction("");
    } else {
      await warningAlert("請輸入個人資料與介紹！");
    }
  };

  return (
    <StyleTeacherAbout>
      <StyleEachDetail>
        <StyleSubtitle>關於我｜About</StyleSubtitle>
        <StyleContainer>
          {aboutData ? (
            <StyleDisplay>
              <StyleAboutDisplay>
                <StyleAbout>
                  <StyleImage
                    src={identityData.photo || noPhoto}
                    alt={identityData.name}
                  />
                  <StyleAboutDetail>
                    <StyleName>{identityData.name}</StyleName>
                    <StyleCompany>{aboutData.presentCompany}</StyleCompany>
                    <StyleCompany>{aboutData.presentTitle}</StyleCompany>
                  </StyleAboutDetail>
                  <StyleAboutData>
                    <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
                    <StyleAboutMeData>
                      {aboutData.introduction}
                    </StyleAboutMeData>
                  </StyleAboutData>
                </StyleAbout>
              </StyleAboutDisplay>
            </StyleDisplay>
          ) : null}

          <StyleAboutContainer>
            <StyleExperienceLabel>
              現職公司｜Present Company
            </StyleExperienceLabel>
            <StyleAboutMeInput
              value={presentCompany}
              onChange={(e) => setPresentCompany(e.target.value)}
              type="text"
              placeholder="請輸入公司名稱"
            />
          </StyleAboutContainer>
          <StyleAboutContainer>
            <StyleExperienceLabel>現職稱謂｜Present Title</StyleExperienceLabel>
            <StyleAboutMeInput
              value={presentTitle}
              onChange={(e) => setPresentTitle(e.target.value)}
              type="text"
              placeholder="請輸入職稱"
            />
          </StyleAboutContainer>
          <StyleAboutContainer>
            <StyleExperienceLabel>個人介紹｜Introduction</StyleExperienceLabel>
            <StyleAboutMeIntroduction
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              maxLength="200"
              placeholder="請輸入個人介紹(限200字)"
            />
          </StyleAboutContainer>
          <StyleTagSubmitButton onClick={handleAboutDisplay}>
            {aboutData ? "更改" : "送出"}簡介
          </StyleTagSubmitButton>
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherAbout>
  );
};

export default TeacherAbout;
