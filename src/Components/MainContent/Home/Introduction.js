import React, { useState } from "react";
import styled from "styled-components";
import edit from "../../../images/edit-hover.png";
import select from "../../../images/home-choose.png";
import video from "../../../images/home-video.png";

const StyleIntroduction = styled.div`
  background: #ecedfd;
  position: relative;
  padding: 1rem;
  height: calc(100vh - 100px);
  margin-top: 100vh;

  @media only screen and (max-width: 1000px) {
    height: fit-content;
  }
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

const StyleSubtitle = styled.div`
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

const StyleStepContentTitle = styled.div`
  position: absolute;
  background-color: #9092db;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  padding: 15px;
  border-radius: 25px;
  top: -25px;
  left: 30px;
  width: 350px;
  font-size: 1.6rem;
  text-align: center;
  color: #fff;

  @media only screen and (max-width: 1350px) {
    font-size: 1.2rem;
    width: 250px;
  }

  @media only screen and (max-width: 1000px) {
    width: 220px;
  }
`;

const StyleContainer = styled.div`
  height: 100%;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 30px 20px;
`;

const StyleStepContentText = styled.div`
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin-top: 20px;
  padding: 0 20px;

  @media only screen and (max-width: 1350px) {
    font-size: 1rem;
    line-height: 1.8rem;
  }
`;

const StyleEmphasize = styled.span`
  color: #7367f0;
  font-weight: 600;
`;

const Introduction = (props) => {
  const [stepDisplay, setStepDisplay] = useState("one");

  const handleTitle = () => {
    if (stepDisplay === "one") {
      return <StyleStepContentTitle>線上即時編輯履歷</StyleStepContentTitle>;
    } else if (stepDisplay === "two") {
      return <StyleStepContentTitle>篩選條件｜預約前輩</StyleStepContentTitle>;
    } else if (stepDisplay === "three") {
      return <StyleStepContentTitle>視訊討論｜即時修改</StyleStepContentTitle>;
    }
  };

  const handleContent = () => {
    if (stepDisplay === "one") {
      return (
        <StyleStepContentText>
          已經知道自己需要哪些幫助了嗎？
          <br />
          在確認目標開始搜尋相關前輩前，先在線上即時編輯履歷，在預約時讓前輩了解狀況，做足功課再來回答你！
          <br />
          <br />
          Re-Live 提供的<StyleEmphasize>即時履歷編輯</StyleEmphasize>
          ，完成滿意的履歷後還能點選
          <StyleEmphasize>列印</StyleEmphasize>將履歷儲存或印出。
        </StyleStepContentText>
      );
    } else if (stepDisplay === "two") {
      return (
        <StyleStepContentText>
          選擇前輩時，可以用
          <StyleEmphasize>產業、職位、履歷批改語言</StyleEmphasize>
          來搜尋，快速找到最適合的人選。
          <br />
          瀏覽完前輩個人介紹後，可以立即選擇中意前輩的
          <StyleEmphasize>可預約時段</StyleEmphasize>。
          <br />
          <br />
          預約完成後會自動導至
          <StyleEmphasize>Profile｜My Class 頁面</StyleEmphasize>
          ，輕鬆查看預約的時段。
        </StyleStepContentText>
      );
    } else if (stepDisplay === "three") {
      return (
        <StyleStepContentText>
          預約當日請特別留意畫面<StyleEmphasize>右上角小鈴鐺</StyleEmphasize>
          ，查看是否有前輩的視訊即時通知。
          <br />
          前往 Live 頁面後，請先<StyleEmphasize>開啟鏡頭</StyleEmphasize>
          ，再進入<StyleEmphasize>專屬隱私視訊房間</StyleEmphasize>
          ，就能和專業的前輩們在線討論並即時批改。
          <br />
          <br />
          結束諮詢後，按下<StyleEmphasize>離開房間</StyleEmphasize>
          可以立即替諮詢體驗留下評論，讓前輩和其他使用者暸解你的收穫與回饋！
        </StyleStepContentText>
      );
    }
  };

  return (
    <StyleIntroduction ref={props.target}>
      <StyleTitleWrap>
        <StyleTitle>職涯大哉問，一對一視訊，讓前輩來 Carry !</StyleTitle>
        <StyleSubtitle>簡單的預約流程，約到不簡單的人</StyleSubtitle>
      </StyleTitleWrap>
      <StyleStepWrap>
        <StyleLine />

        <StyleStepMenu>
          <StyleEachStep onClick={() => setStepDisplay("one")}>
            <StyleStepOrder>1.</StyleStepOrder>
            <StyleText stepDisplay={stepDisplay}>
              Profile 頁面｜編輯履歷
            </StyleText>
            <StyleIconWrap>
              <StyleIcon
                src={edit}
                alt={"edit"}
                stepDisplay={stepDisplay}></StyleIcon>
            </StyleIconWrap>
          </StyleEachStep>
          <StyleEachStep onClick={() => setStepDisplay("two")}>
            <StyleStepOrder>2.</StyleStepOrder>
            <StyleText stepDisplay={stepDisplay}>
              Teacher 頁面｜選擇前輩
            </StyleText>
            <StyleIconWrap>
              <StyleIcon
                src={select}
                alt={"edit"}
                stepDisplay={stepDisplay}></StyleIcon>
            </StyleIconWrap>
          </StyleEachStep>
          <StyleEachStep onClick={() => setStepDisplay("three")}>
            <StyleStepOrder>3.</StyleStepOrder>
            <StyleText stepDisplay={stepDisplay}>Live 頁面｜視訊諮詢</StyleText>
            <StyleIconWrap>
              <StyleIcon
                src={video}
                alt={"video"}
                stepDisplay={stepDisplay}></StyleIcon>
            </StyleIconWrap>
          </StyleEachStep>
        </StyleStepMenu>

        <StyleStepContent>
          {handleTitle()}
          <StyleContainer>{handleContent()}</StyleContainer>
        </StyleStepContent>

        {/* <StyleStepContent>
          {handleTitle()}
          {handleContent()}
        </StyleStepContent> */}
      </StyleStepWrap>
    </StyleIntroduction>
  );
};

export default Introduction;
