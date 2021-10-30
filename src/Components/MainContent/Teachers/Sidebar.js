import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

const StyleSidebar = styled.div`
  width: 300px;
  height: 100vh;
  position: sticky;
  display: inline-block;
  background-color: #e9e9e9;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    /* height: 300px; */
    height: fit-content;
  }
`;

const StyleForm = styled.form`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #e9e9e9;
  border-radius: 20px;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    height: fit-content;
    padding: 10px 20px 20px 20px;
  }
`;

const StyleData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media only screen and (max-width: 1020px) {
    flex-direction: row;
  }

  @media only screen and (max-width: 730px) {
    flex-direction: column;
  }
`;

const StyleTagContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1020px) {
    padding: 5px;
  }
`;

const StyleLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px;

  @media only screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

const StyleSelect = styled(Select)`
  width: 250px;
  margin-bottom: 10px;

  @media only screen and (max-width: 900px) {
    width: 200px;
  }

  @media only screen and (max-width: 730px) {
    width: 100%;
  }
`;

const StyleTagDisplayArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media only screen and (max-width: 1020px) {
    padding: 20px 30px 0 30px;
    flex-direction: row;
  }
`;

const StyleTag = styled.div`
  background-color: #bbadff;
  width: 100%;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin: 10px auto;

  @media only screen and (max-width: 1020px) {
    width: fit-content;
    margin: 0;
    margin-right: 10px;
  }
`;

const StyleValue = styled.div`
  line-height: 20px;
`;

const Sidebar = (props) => {
  const [selectIndustry, setSelectIndustry] = useState(null);
  const [selectTitle, setSelectTitle] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState(null);
  const [displayTag, setDisplayTag] = useState(false);

  const industryOptions = [
    { value: "農、林、漁、牧業", label: "農、林、漁、牧業" },
    { value: "礦業及土石採取業", label: "礦業及土石採取業" },
    { value: "製造業", label: "製造業" },
    { value: "電力及燃氣供應業", label: "電力及燃氣供應業" },
    { value: "用水供應及污染整治業", label: "用水供應及污染整治業" },
    { value: "營建工程業", label: "營建工程業" },
    { value: "批發及零售業", label: "批發及零售業" },
    { value: "運輸及倉儲業", label: "運輸及倉儲業" },
    { value: "住宿及餐飲業", label: "住宿及餐飲業" },
    { value: "出版影音及資通訊業", label: "出版影音及資通訊業" },
    { value: "金融及保險業", label: "金融及保險業" },
    { value: "不動產業", label: "不動產業" },
    { value: "專業、科學及技術服務業", label: "專業、科學及技術服務業" },
    { value: "支援服務業", label: "支援服務業" },
    {
      value: "公共行政及國防、強制性社會安全",
      label: "公共行政及國防、強制性社會安全",
    },
    { value: "教育業", label: "教育業" },
    { value: "醫療保健及社會工作服務業", label: "醫療保健及社會工作服務業" },
    { value: "藝術、娛樂及休閒服務業", label: "藝術、娛樂及休閒服務業" },
    { value: "其他服務業", label: "其他服務業" },
  ];

  const titleOptions = [
    { value: "實習生", label: "實習生" },
    { value: "初階", label: "初階" },
    { value: "中高階", label: "中高階" },
    { value: "經理/主管", label: "經理/主管" },
    { value: "董事/高階主管", label: "董事/高階主管" },
  ];

  const languageOptions = [
    { value: "中文", label: "中文" },
    { value: "英文", label: "英文" },
    { value: "其他", label: "其他" },
  ];

  const handleIndustryChange = (tag) => {
    setSelectIndustry(tag);
    setDisplayTag(true);
  };
  const handleTitleChange = (tag) => {
    setSelectTitle(tag);
    setDisplayTag(true);
  };
  const handleLanguageChange = (tag) => {
    setSelectLanguage(tag);
    setDisplayTag(true);
  };

  return (
    <StyleSidebar>
      {displayTag ? (
        <StyleTagDisplayArea>
          {selectIndustry !== null ? (
            <StyleTag>
              <StyleValue>{selectIndustry.value}</StyleValue>
            </StyleTag>
          ) : null}
          {selectTitle !== null ? (
            <StyleTag>
              <StyleValue>{selectTitle.value}</StyleValue>
            </StyleTag>
          ) : null}
          {selectLanguage !== null ? (
            <StyleTag>
              <StyleValue>{selectLanguage.value}</StyleValue>
            </StyleTag>
          ) : null}
        </StyleTagDisplayArea>
      ) : null}
      <StyleForm>
        <StyleData>
          <StyleTagContainer>
            <StyleLabel>產業｜Industry</StyleLabel>
            <StyleSelect
              value={selectIndustry}
              onChange={handleIndustryChange}
              options={industryOptions}
              placeholder={"請選擇產業別"}
            />
          </StyleTagContainer>

          <StyleTagContainer>
            <StyleLabel>職業稱謂｜Title</StyleLabel>
            <StyleSelect
              value={selectTitle}
              onChange={handleTitleChange}
              options={titleOptions}
              placeholder={"請選擇職業稱謂"}
            />
          </StyleTagContainer>

          <StyleTagContainer>
            <StyleLabel>履歷批改語言｜Language</StyleLabel>
            <StyleSelect
              value={selectLanguage}
              onChange={handleLanguageChange}
              options={languageOptions}
              placeholder={"請選擇履歷批改語言"}
            />
          </StyleTagContainer>
        </StyleData>
        {/* {displayTag ? null : (
          <StyleTagSubmitButton onClick={handleDisplay}>
            送出標籤
          </StyleTagSubmitButton>
        )} */}
      </StyleForm>
    </StyleSidebar>
  );
};

export default Sidebar;
