import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import firebase, { updateTeacherData } from "../../../../../../utils/firebase";
import { successAlert, warningAlert } from "../../../../../../utils/swal";
import { StyleWhiteButton } from "../../../../../Common/button";

const StyleTeacherTalent = styled.div`
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

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #9092db;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 250px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;

  @media only screen and (max-width: 600px) {
    width: 200px;
    font-size: 1.1rem;
  }
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #f3f3f3;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 50px 30px 20px 30px;
`;

const StyleTalentArea = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 40px;
  padding: 20px 20px 0;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px 0px;
  }
`;

const StyleTalentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  @media only screen and (max-width: 1000px) {
    padding: 0 10px;
    margin-bottom: 5px;
  }
`;

const StyleLabel = styled.label`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;
  color: grey;
  border-bottom: 2px solid #898292;
  margin-bottom: 5px;
`;

const StyleLabelTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2rem;
  color: #898292;
`;

const StyleLabelSubtitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 2rem;
  color: #898292;
  border-bottom: 2px solid #898292;
  margin: 5px 0;

  @media only screen and (max-width: 1000px) {
    width: fit-content;
  }
`;

const StyleInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;
`;

const StyleDescriptionInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  height: 100px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;

  @media only screen and (max-width: 1000px) {
    height: 60px;
  }
`;

const StyleTalentDisplayContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 40px;
  margin-bottom: 45px;
  background-color: #fff;
  border-radius: 25px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px 0px;
  }
`;

const StyleTalentDisplay = styled.div`
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const StyleTalentDisplayLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
  color: black;
  margin-left: 10px;
`;

const StyleTalentDisplayText = styled.div`
  margin-top: 5px;
  padding: 0 3px;
  line-height: 1.5rem;

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const StyleTagSubmitButton = styled(StyleWhiteButton)`
  margin: 20px auto 10px;
`;

const TeacherTalent = () => {
  const identityData = useSelector((state) => state.identityData);
  const talentsData = identityData.talents;

  const [talent1Title, setTalent1Title] = useState("");
  const [talent1Description, setTalent1Description] = useState("");
  const [talent2Title, setTalent2Title] = useState("");
  const [talent2Description, setTalent2Description] = useState("");
  const [talent3Title, setTalent3Title] = useState("");
  const [talent3Description, setTalent3Description] = useState("");

  const handleTalentDisplay = async () => {
    if (
      talent1Title.length !== 0 &&
      talent1Description.length !== 0 &&
      talent2Title.length !== 0 &&
      talent2Description.length !== 0 &&
      talent3Title.length !== 0 &&
      talent3Description.length !== 0
    ) {
      const talents = [
        { title: talent1Title, description: talent1Description },
        { title: talent2Title, description: talent2Description },
        { title: talent3Title, description: talent3Description },
      ];
      await updateTeacherData(identityData.email, { talents });
      await successAlert("更改成功！");

      setTalent1Title("");
      setTalent1Description("");
      setTalent2Title("");
      setTalent2Description("");
      setTalent3Title("");
      setTalent3Description("");
    } else {
      await warningAlert("請輸入完整三項技能！");
    }
  };

  return (
    <StyleTeacherTalent>
      <StyleEachDetail>
        <StyleSubtitle>擅長技能｜Talent</StyleSubtitle>
        <StyleContainer>
          {talentsData ? (
            <StyleTalentDisplayContainer>
              {talentsData.map((talent, index) => {
                return (
                  <StyleTalentDisplay key={nanoid()}>
                    <StyleLabel>
                      {index + 1}.
                      <StyleTalentDisplayLabel>
                        {talent.title}
                      </StyleTalentDisplayLabel>
                    </StyleLabel>
                    <StyleTalentDisplayText>
                      {talent.description}
                    </StyleTalentDisplayText>
                  </StyleTalentDisplay>
                );
              })}
            </StyleTalentDisplayContainer>
          ) : null}

          <StyleTalentArea>
            <StyleTalentContainer>
              <StyleLabel>
                1. <StyleLabelTitle>技能一</StyleLabelTitle>
              </StyleLabel>
              <StyleInput
                value={talent1Title}
                onChange={(e) => setTalent1Title(e.target.value)}
                type="text"
                placeholder="請輸入技能名稱(限5字)"
                maxLength="5"
              />

              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent1Description}
                onChange={(e) => setTalent1Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
              />
            </StyleTalentContainer>

            <StyleTalentContainer>
              <StyleLabel>
                2. <StyleLabelTitle>技能二</StyleLabelTitle>
              </StyleLabel>
              <StyleInput
                value={talent2Title}
                onChange={(e) => setTalent2Title(e.target.value)}
                type="text"
                placeholder="請輸入技能名稱(限5字)"
                maxLength="5"
              />
              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent2Description}
                onChange={(e) => setTalent2Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
              />
            </StyleTalentContainer>

            <StyleTalentContainer>
              <StyleLabel>
                3. <StyleLabelTitle>技能三</StyleLabelTitle>
              </StyleLabel>
              <StyleInput
                value={talent3Title}
                onChange={(e) => setTalent3Title(e.target.value)}
                type="text"
                placeholder="請輸入技能名稱(限5字)"
                maxLength="5"
              />
              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent3Description}
                onChange={(e) => setTalent3Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
              />
            </StyleTalentContainer>
          </StyleTalentArea>
          <StyleTagSubmitButton onClick={handleTalentDisplay}>
            {talentsData ? "更改" : "送出"}技能
          </StyleTagSubmitButton>
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherTalent>
  );
};

export default TeacherTalent;
