import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Select from "react-select";
import Swal from "sweetalert2";
import firebase from "../../../../../utils/firebase";

const StyleTeacherTag = styled.div`
  width: 100%;
  padding: 20px 40px;

  @media only screen and (max-width: 660px) {
    padding: 20px;
  }
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
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  line-height: 38px;
  margin: 20px auto 10px auto;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleTagDisplayArea = styled.div`
  display: flex;
  padding: 10px 0;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyleTag = styled.div`
  background-color: #7367f0;
  color: #fff;
  width: fit-content;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin-right: 10px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
    width: 100%;
  }
`;

const StyleValue = styled.div`
  line-height: 20px;
`;

const TeacherTag = () => {
  const identityData = useSelector((state) => state.identityData);
  const tag = identityData.tag;

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");

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
    if (
      selectIndustry.length !== 0 &&
      selectTitle.length !== 0 &&
      selectLanguage.length !== 0
    ) {
      const tag = {
        industry: selectIndustry.value,
        title: selectTitle.value,
        language: selectLanguage.value,
      };
      teachersRef.update({ tag }).then(() => {
        Swal.fire({
          title: "更改成功！",
          icon: "success",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
    } else {
      Swal.fire({
        title: "請選擇分類標籤！",
        icon: "warning",
        customClass: {
          confirmButton: "confirm__button",
        },
      });
    }
  };

  return (
    <StyleTeacherTag>
      <StyleTitle>分類標籤｜Tag</StyleTitle>
      {tag ? (
        <StyleTagDisplayArea>
          <StyleTag>
            <StyleValue>{tag.industry}</StyleValue>
          </StyleTag>
          <StyleTag>
            <StyleValue>{tag.title}</StyleValue>
          </StyleTag>
          <StyleTag>
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
          {tag ? "更改" : "送出"}標籤
        </StyleTagSubmitButton>
      </StyleForm>
    </StyleTeacherTag>
  );
};

export default TeacherTag;
