import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const StyleTeacherTalent = styled.div`
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

const StyleTalentArea = styled.div`
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const StyleTalentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 900px) {
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
  font-size: 1rem;
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
  width: 200px;

  @media only screen and (max-width: 900px) {
    width: fit-content;
  }
`;

const StyleInput = styled.input`
  padding: 5px;
  width: 200px;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;

  @media only screen and (max-width: 1020px) {
    width: 100%;
  }
`;

const StyleDescriptionInput = styled.input`
  padding: 5px;
  width: 200px;
  height: 100px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;

  @media only screen and (max-width: 1020px) {
    width: 100%;
  }

  @media only screen and (max-width: 900px) {
    height: 60px;
  }
`;

const StyleTalentDisplayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const StyleTalentDisplay = styled.div`
  margin: 20px 0 10px 0;
  padding: 5px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 239px;

  @media only screen and (max-width: 900px) {
    width: 100%;
    margin: 10px 0 5px 0;
  }
`;

const StyleTalentDisplayLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
  color: black;
  margin-left: 10px;
`;

const StyleTalentDisplayText = styled.div`
  width: 199px;
  margin-top: 5px;
  padding: 0 3px;

  @media only screen and (max-width: 900px) {
    width: 100%;
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

const TeacherTalent = (props) => {
  const [talent1Title, setTalent1Title] = useState("");
  const [talent1Description, setTalent1Description] = useState("");
  const [talent2Title, setTalent2Title] = useState("");
  const [talent2Description, setTalent2Description] = useState("");
  const [talent3Title, setTalent3Title] = useState("");
  const [talent3Description, setTalent3Description] = useState("");
  const [displayTalent, setDisplayTalent] = useState(false);
  const [talents, setTalents] = useState(null);

  const handleTalentDisplay = () => {
    if (talent1Title === "" && talent1Description === "") {
      window.alert("請輸入技能！");
    } else {
      setDisplayTalent(true);
      const newTalent = [
        { title: talent1Title, description: talent1Description },
        { title: talent2Title, description: talent2Description },
        { title: talent3Title, description: talent3Description },
      ];
      setTalents(newTalent);
      setTalent1Title("");
      setTalent1Description("");
      setTalent2Title("");
      setTalent2Description("");
      setTalent3Title("");
      setTalent3Description("");
    }
  };

  return (
    <StyleTeacherTalent>
      <StyleEachDetail>
        <StyleSubtitle>擅長技能｜Talent</StyleSubtitle>
        <StyleContainer>
          <StyleTalentArea>
            <StyleTalentContainer>
              <StyleLabel>
                1. <StyleLabelTitle>技能一</StyleLabelTitle>
              </StyleLabel>
              <StyleInput
                value={talent1Title}
                onChange={(e) => setTalent1Title(e.target.value)}
                type="text"
                placeholder="請輸入技能名稱(限4字)"
                maxLength="4"
                required
              />

              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent1Description}
                onChange={(e) => setTalent1Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
                required
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
                placeholder="請輸入技能名稱(限4字)"
                maxLength="4"
                required
              />
              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent2Description}
                onChange={(e) => setTalent2Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
                required
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
                placeholder="請輸入技能名稱(限4字)"
                maxLength="4"
                required
              />
              <StyleLabelSubtitle>技能介紹</StyleLabelSubtitle>
              <StyleDescriptionInput
                value={talent3Description}
                onChange={(e) => setTalent3Description(e.target.value)}
                type="textarea"
                placeholder="請輸入技能簡介(限100字)"
                maxLength="100"
                required
              />
            </StyleTalentContainer>
          </StyleTalentArea>
          <StyleTagSubmitButton onClick={handleTalentDisplay}>
            {talents === null ? "送出" : "更改"}
          </StyleTagSubmitButton>
          {displayTalent ? (
            <StyleTalentDisplayContainer>
              {talents.map((talent, index) => {
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
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherTalent>
  );
};

export default TeacherTalent;
