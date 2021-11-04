import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Select from "react-select";
import firebase from "../../../../../utils/config/firebase-config";

const StyleTeacherTag = styled.div`
  width: 100%;
  padding: 20px;
`;

const StyleTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 10px;
`;

const StyleForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #e4e5e1;
  border-radius: 20px;
`;

const StyleData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 1020px) {
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
`;

const StyleSelect = styled(Select)`
  width: 250px;

  @media only screen and (max-width: 1020px) {
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

const StyleTagDisplayArea = styled.div`
  display: flex;
  padding: 10px 0;
`;

const StyleTag = styled.div`
  background-color: #bbadff;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin-right: 10px;
`;

const StyleTagIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-image: url("/images/tag.png");
`;

const StyleValue = styled.div`
  line-height: 20px;
`;

const TeacherTag = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const tag = identityData.tag;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
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
  };
  const handleTitleChange = (tag) => {
    setSelectTitle(tag);
  };
  const handleLanguageChange = (tag) => {
    setSelectLanguage(tag);
  };

  const handleDisplay = () => {
    if (selectIndustry !== "" && selectTitle !== "" && selectLanguage !== "") {
      const tag = {
        industry: selectIndustry.value,
        title: selectTitle.value,
        language: selectLanguage.value,
      };
      teachersRef.update({ tag }).then(() => {
        setDisplayTag(true);
      });
    } else {
      window.alert("請選擇分類標籤！");
    }
  };

  useEffect(() => {
    // 初始狀態
    if (tag) {
      setDisplayTag(true);
    }
  }, [tag]);

  return (
    <StyleTeacherTag>
      <StyleTitle>分類標籤｜Tag</StyleTitle>
      {displayTag ? (
        <StyleTagDisplayArea>
          <StyleTag>
            {/* <StyleTagIcon /> */}
            <StyleValue>{tag.industry}</StyleValue>
          </StyleTag>
          <StyleTag>
            {/* <StyleTagIcon /> */}
            <StyleValue>{tag.title}</StyleValue>
          </StyleTag>
          <StyleTag>
            {/* <StyleTagIcon /> */}
            <StyleValue>{tag.language}</StyleValue>
          </StyleTag>
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
        <StyleTagSubmitButton onClick={handleDisplay}>
          {displayTag ? "更新" : "送出"}標籤
        </StyleTagSubmitButton>
      </StyleForm>
    </StyleTeacherTag>
  );
};

export default TeacherTag;
