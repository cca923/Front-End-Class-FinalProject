import React from "react";
import styled from "styled-components";

const StyleStepContentText = styled.div`
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin-top: 20px;
  padding: 0 20px;

  @media only screen and (max-width: 1350px) {
    font-size: 1rem;
    line-height: 1.8rem;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 0 0 10px;
  }
`;

const StyleEmphasize = styled.span`
  color: #7367f0;
  font-weight: 600;
`;

const Content = ({ stepDisplay }) => {
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
  }
  if (stepDisplay === "two") {
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
  }
  if (stepDisplay === "three") {
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
  return null;
};

export default Content;
