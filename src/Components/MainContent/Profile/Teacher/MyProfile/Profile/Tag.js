import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Select from "react-select";
import { updateTeacherData } from "../../../../../../utils/firebase";
import {
  industryOptions,
  languageOptions,
  titleOptions,
} from "../../../../../../utils/tagOptions";
import { successAlert, warningAlert } from "../../../../../../utils/swal";
import { StyleWhiteButton } from "../../../../../Common/button";

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
  padding: 15px 0;
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

const StyleTagSubmitButton = styled(StyleWhiteButton)`
  margin: 20px auto 10px;
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
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");

  const handleDisplay = async () => {
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
      await updateTeacherData(identityData.email, { tag });
      await successAlert("更改成功！");
    } else {
      await warningAlert("請選擇分類標籤！");
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
              onChange={(tag) => setSelectIndustry(tag)}
              options={industryOptions}
              placeholder={"請選擇產業別"}
            />
          </StyleTagContainer>

          <StyleTagContainer>
            <StyleLabel>職業稱謂｜Title</StyleLabel>
            <StyleSelect
              value={selectTitle}
              onChange={(tag) => setSelectTitle(tag)}
              options={titleOptions}
              placeholder={"請選擇職業稱謂"}
            />
          </StyleTagContainer>

          <StyleTagContainer>
            <StyleLabel>履歷批改語言｜Language</StyleLabel>
            <StyleSelect
              value={selectLanguage}
              onChange={(tag) => setSelectLanguage(tag)}
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
