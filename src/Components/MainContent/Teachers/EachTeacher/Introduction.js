import React, { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import noPhoto from "../../../../images/no-photo.png";

const StyleIntroduction = styled.div`
  width: 100%;
  height: fit-content;
`;

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

const StyleDisplay = styled.div`
  width: 100%;
`;

const StyleAboutLabel = styled.div`
  width: 300px;
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

const StyleJob = styled.div`
  background-color: #f3f3f3;
  margin: 20px;
  padding: 5px 20px;
  border-radius: 10px;
  display: flex;
  position: relative;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const StyleJobData = styled.div`
  display: flex;
  padding: 5px 0;

  @media only screen and (max-width: 1200px) {
    padding: 1px 0;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const StyleJobLabel = styled.div`
  width: fit-content;
  margin-right: 15px;
  color: #898292;
  padding: 2px 0;
  line-height: 24px;

  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
`;

const StyleJobTitleLabel = styled.div`
  width: fit-content;
  margin-right: 15px;
  color: #898292;
  padding: 2px 0;
  line-height: 24px;

  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
`;

const StyleJobValue = styled.div`
  min-width: 180px;
  color: black;
  font-weight: 600;
  line-height: 24px;
  padding: 2px 0;
  margin-right: 15px;
`;

const StyleJobTime = styled.div`
  display: flex;
  padding: 5px 0;
  margin-left: auto;
`;

const StyleJobTimeValue = styled.div`
  color: black;
  font-weight: 400;
  width: 200px;
  line-height: 24px;
  padding: 2px 0;
  text-align: end;
`;

const StyleMoreButton = styled.div`
  width: 120px;
  margin: 20px auto 0 0;
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-bottom: solid 3px #e66158;
  border-left: solid 3px #e66158;
  color: #e66158;
  transition: 0.4s;
  display: ${(props) => (props.more ? "none" : "block")};
  cursor: pointer;

  &:hover {
    padding-top: 0.8em;
    padding-right: 0.3em;
  }
`;

const StyleIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

const Introduction = (props) => {
  const teacherData = props.teacherData;
  const [more, setMore] = useState(false);

  return (
    <StyleIntroduction>
      <StyleEachDetail>
        <StyleTeacher>
          <StyleAbout>
            <StyleImage
              src={teacherData.photo || noPhoto}
              alt={teacherData.name}
            />
            <StyleAboutDetail>
              <StyleName>{teacherData.name}</StyleName>
              <StyleCompany>{teacherData.about.presentCompany}</StyleCompany>
              <StyleCompany>{teacherData.about.presentTitle}</StyleCompany>
            </StyleAboutDetail>
            <StyleAboutData>
              <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
              <StyleAboutMeData>
                {teacherData.about.introduction}
              </StyleAboutMeData>
            </StyleAboutData>
          </StyleAbout>
        </StyleTeacher>
      </StyleEachDetail>

      <StyleEachDetail>
        <StyleSubtitle>擅長技能｜Talent</StyleSubtitle>
        <StyleContainer>
          <StyleTalentDisplayContainer>
            {teacherData.talents.map((talent, index) => {
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

      <StyleEachDetail>
        <StyleSubtitle>工作經歷｜Experience</StyleSubtitle>
        <StyleContainer>
          <StyleDisplay>
            {(more
              ? teacherData.experience.sort((a, b) => {
                  return a.endDate < b.endDate ? 1 : -1; // 新到舊
                })
              : teacherData.experience
                  .sort((a, b) => {
                    return a.endDate < b.endDate ? 1 : -1; // 新到舊
                  })
                  .slice(0, 2)
            ).map((job) => {
              return (
                <StyleJob key={nanoid()}>
                  <StyleJobData>
                    <StyleJobLabel>公司名稱｜Company</StyleJobLabel>
                    <StyleJobValue>{job.company}</StyleJobValue>
                  </StyleJobData>
                  <StyleJobData>
                    <StyleJobTitleLabel>職業稱謂｜Title</StyleJobTitleLabel>
                    <StyleJobValue>{job.title}</StyleJobValue>
                  </StyleJobData>
                  <StyleJobTime>
                    <StyleJobTimeValue>
                      {job.startDate.replace(/-/g, "/")} ─ {""}
                      {job.endDate.replace(/-/g, "/")}
                    </StyleJobTimeValue>
                  </StyleJobTime>
                </StyleJob>
              );
            })}
          </StyleDisplay>
          {teacherData.experience.length > 2 ? (
            <StyleMoreButton
              more={more}
              onClick={() => {
                setMore(true);
              }}>
              查看更多
              <StyleIcon icon={faCaretDown} color="#e66158" />
            </StyleMoreButton>
          ) : null}
        </StyleContainer>
      </StyleEachDetail>
    </StyleIntroduction>
  );
};

export default Introduction;
