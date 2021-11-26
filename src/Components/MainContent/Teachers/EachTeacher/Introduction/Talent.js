import React from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 30px 0 40px;
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
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #fff;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 25px 30px 20px;
`;

const StyleLabel = styled.label`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;
  color: grey;
  border-bottom: 2px solid #c4bccf;
  margin-bottom: 5px;
`;

const StyleTalentDisplayContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 40px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyleTalentDisplay = styled.div`
  margin: 20px 0 10px 0;
  padding: 5px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

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
  margin-top: 5px;
  padding: 0 3px;
  line-height: 1.5rem;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Talent = ({ eachTeacherData }) => {
  return (
    <StyleEachDetail>
      <StyleSubtitle>擅長技能｜Talent</StyleSubtitle>
      <StyleContainer>
        <StyleTalentDisplayContainer>
          {eachTeacherData.talents.map((talent, index) => {
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
      </StyleContainer>
    </StyleEachDetail>
  );
};

export default Talent;
