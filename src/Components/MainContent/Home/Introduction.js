import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import { StyleSubtitle } from "../../Common/title";

import edit from "../../../images/edit-hover.png";
import select from "../../../images/home-choose.png";
import video from "../../../images/home-video.png";

import Content from "./Content";

const StyleIntroduction = styled.div`
  background: #ecedfd;
  position: relative;
  padding: 2rem;
  height: fit-content;
  margin-top: 100vh;
  scroll-margin-top: 100px;
`;

const StyleTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 50px auto 70px auto;

  @media only screen and (max-width: 1350px) {
    margin: 50px auto;
  }

  @media only screen and (max-width: 1000px) {
    margin: 30px auto 0 auto;
  }
`;

const StyleTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 600;

  @media only screen and (max-width: 1350px) {
    font-size: 1.8rem;
  }

  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`;

const StyleCaption = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #7367f0;
  margin-top: 20px;

  @media only screen and (max-width: 1350px) {
    font-size: 1.2rem;
  }
`;

const StyleStepWrap = styled.div`
  display: flex;
  height: fit-content;
  position: relative;
  margin: 50px;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const StyleStepMenu = styled.div`
  width: 350px;
  height: 100%;
  flex-direction: column;
  margin-right: 80px;

  @media only screen and (max-width: 1000px) {
    height: fit-content;
    margin: auto;
    width: 260px;
  }
`;

const StyleText = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0.6;
  transition: 0.2s;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
    line-height: 40px;
  }
`;

const StyleStepOrder = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 48px;
  color: grey;
  margin-bottom: 5px;
  margin-right: 10px;

  @media only screen and (max-width: 1000px) {
    font-size: 2rem;
    line-height: 40px;
  }
`;

const StyleIconWrap = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 10px;
  top: 50%;
  transform: translate(50%, -50%);
  position: absolute;
  background-color: black;
  background-color: #ecedfd;
  border-radius: 50%;
  right: 0;
  transition: all 0.3s;

  @media only screen and (max-width: 1000px) {
    padding: 5px;
    width: 45px;
    height: 45px;
  }
`;

const StyleIcon = styled.img`
  width: 40px;
  height: 40px;
  opacity: 0.6;
  margin: auto;

  @media only screen and (max-width: 1000px) {
    width: 30px;
    height: 30px;
  }
`;

const StyleEachStep = styled.div`
  padding: 40px 20px;
  line-height: 48px;
  cursor: pointer;
  position: relative;

  &:hover ${StyleText} {
    opacity: 1;
  }

  &:hover ${StyleIcon} {
    opacity: 1;
  }

  &:hover ${StyleIconWrap} {
    opacity: 1;
    border-color: 2px solid #7367f0;
    box-shadow: rgba(0, 0, 226, 0.12) 0px 2px 4px 0px,
      rgba(0, 0, 226, 0.32) 0px 2px 16px 0px;
  }

  @media only screen and (max-width: 1000px) {
    padding: 5px;
    line-height: 40px;
  }
`;

const StyleLine = styled.div`
  position: absolute;
  left: 350px;
  top: 0;
  right: auto;
  bottom: 0;
  border-left: 2px dashed #484c7a;

  @media only screen and (max-width: 1000px) {
    left: 0;
    top: 180px;
    right: 0;
    bottom: auto;
    margin-right: 32px;
    margin-left: 32px;
    border-top: 2px dashed #484c7a;
  }
`;

const StyleStepContent = styled.div`
  position: relative;
  width: calc(100% - 430px);
  background-color: #fff;
  border-radius: 20px;
  height: fit-content;
  margin-top: 80px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    margin-top: 60px;
  }
`;

const StyleStepContentTitle = styled(StyleSubtitle)`
  top: -25px;
  left: 30px;
  width: 350px;
  font-size: 1.6rem;

  @media only screen and (max-width: 1350px) {
    font-size: 1.2rem;
    width: 250px;
  }

  @media only screen and (max-width: 1000px) {
    top: -23px;
    width: 220px;
    line-height: 1rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    width: 200px;
    padding: 13px;
    top: -20px;
  }
`;

const StyleContainer = styled.div`
  height: 100%;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 30px 20px;
`;

const Introduction = ({ target }) => {
  const [stepDisplay, setStepDisplay] = useState("one");

  const stepInfoMapping = [
    {
      key: "one",
      tag: "1",
      label: "Profile 頁面｜編輯履歷",
      content: "線上即時編輯履歷",
      src: edit,
      alt: "edit",
    },
    {
      key: "two",
      tag: "2",
      label: "Teacher 頁面｜選擇前輩",
      content: "篩選條件｜預約前輩",
      src: select,
      alt: "select",
    },
    {
      key: "three",
      tag: "3",
      label: "Live 頁面｜視訊諮詢",
      content: "視訊討論｜在線修改",
      src: video,
      alt: "video",
    },
  ];

  const titleMapping = {
    one: "線上即時編輯履歷",
    two: "篩選條件｜預約前輩",
    three: "視訊討論｜在線修改",
  };

  return (
    <StyleIntroduction ref={target}>
      <StyleTitleWrap>
        <StyleTitle>職涯大哉問，一對一視訊，讓前輩來 Carry !</StyleTitle>
        <StyleCaption>簡單的預約流程，約到不簡單的人</StyleCaption>
      </StyleTitleWrap>
      <StyleStepWrap>
        <StyleLine />

        <StyleStepMenu>
          {stepInfoMapping.map(({ key, tag, label, src, alt }) => {
            return (
              <StyleEachStep key={nanoid()} onClick={() => setStepDisplay(key)}>
                <StyleStepOrder>{`${tag}.`}</StyleStepOrder>
                <StyleText stepDisplay={stepDisplay}>{label}</StyleText>
                <StyleIconWrap>
                  <StyleIcon
                    src={src}
                    alt={alt}
                    stepDisplay={stepDisplay}></StyleIcon>
                </StyleIconWrap>
              </StyleEachStep>
            );
          })}
        </StyleStepMenu>

        <StyleStepContent>
          <StyleStepContentTitle>
            {titleMapping[stepDisplay]}
          </StyleStepContentTitle>
          <StyleContainer>
            <Content stepDisplay={stepDisplay} />
          </StyleContainer>
        </StyleStepContent>
      </StyleStepWrap>
    </StyleIntroduction>
  );
};

export default Introduction;
