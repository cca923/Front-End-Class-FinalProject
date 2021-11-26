import React, { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

const StyleDisplay = styled.div`
  width: 100%;
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

const Experience = ({ eachTeacherData }) => {
  const [more, setMore] = useState(false);

  return (
    <StyleEachDetail>
      <StyleSubtitle>工作經歷｜Experience</StyleSubtitle>
      <StyleContainer>
        <StyleDisplay>
          {(more
            ? eachTeacherData.experience.sort((a, b) => {
                return a.endDate < b.endDate ? 1 : -1; // 新到舊
              })
            : eachTeacherData.experience
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
        {eachTeacherData.experience.length > 2 ? (
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
  );
};

export default Experience;
