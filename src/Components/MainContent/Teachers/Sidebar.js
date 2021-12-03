import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";

import {
  industryOptions,
  languageOptions,
  titleOptions,
} from "../../../utils/tagOptions";

import slider from "../../../images/slider.png";

const StyleSidebar = styled.div`
  width: 300px;
  display: inline-block;
  background-color: #f3f3f3;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    height: fit-content;
    z-index: 100;
  }
`;

const StyleSticky = styled.div`
  position: sticky;
  top: 100px;
`;

const StyleForm = styled.form`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f3f3f3;

  @media only screen and (max-width: 1020px) {
    visibility: ${(props) => (props.layer ? "visible" : "hidden")};
    opacity: ${(props) => (props.layer ? "1" : "0")};
    height: ${(props) => (props.layer ? "430px" : "0")};
    width: 100%;
    padding: ${(props) => (props.layer ? "10px 40px 20px 40px" : "0")};
    top: 0;
    transition: 0.3s;
    overflow-x: hidden;
  }
`;

const StyleFilterArea = styled.div`
  display: none;

  @media only screen and (max-width: 1020px) {
    display: block;
    width: 100%;
    height: 100px;
    background-color: #f3f3f3;
    padding: 20px 40px;
  }
`;

const StyleFilterTilte = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 30px;
  background-color: #e4e5e1;

  @media only screen and (max-width: 1020px) {
    display: none;
  }
`;

const StyleFilterbutton = styled.div`
  display: none;

  @media only screen and (max-width: 1020px) {
    background-color: #fff;
    display: flex;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
    border-radius: 5px;
    justify-content: center;
    line-height: 60px;
    cursor: pointer;
  }
`;

const StyleFilterIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0 auto 10px;
`;

const StyleData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const StyleTagContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1020px) {
    padding: 3px 0;
  }
`;

const StyleLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 8px 3px;
  }
`;

const StyleSelect = styled(Select)`
  width: 250px;
  margin-bottom: 10px;

  @media only screen and (max-width: 1020px) {
    width: 100%;
  }
`;

const StyleTagDisplayArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;

  @media only screen and (max-width: 1020px) {
    display: ${(props) => (props.layer ? "flex" : "none")};
    padding: 20px 40px 0 40px;
    flex-direction: row;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyleTag = styled.div`
  background-color: #7367f0;
  color: #fff;
  width: 100%;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin: 8px auto;

  @media only screen and (max-width: 1020px) {
    width: fit-content;
    margin: 0;
    margin-right: 10px;
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
    width: 100%;
  }
`;

const StyleValue = styled.div`
  line-height: 20px;
  margin-right: auto;

  @media only screen and (max-width: 1020px) {
    margin-right: 10px;
  }

  @media only screen and (max-width: 600px) {
    margin-right: auto;
  }
`;

const StyleRemove = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-image: url("/images/remove.png");
  cursor: pointer;

  &:hover {
    background-image: url("/images/remove-hover.png");
  }
`;

const Sidebar = ({
  selectIndustry,
  setSelectIndustry,
  selectTitle,
  setSelectTitle,
  selectLanguage,
  setSelectLanguage,
}) => {
  const [layer, setLayer] = useState(false);

  return (
    <StyleSidebar>
      <StyleSticky>
        <StyleFilterArea>
          <StyleFilterbutton
            onClick={() => {
              layer ? setLayer(false) : setLayer(true);
            }}>
            篩選條件
            <StyleFilterIcon src={slider} alt={"篩選條件"} />
          </StyleFilterbutton>
        </StyleFilterArea>

        <StyleFilterTilte>
          篩選條件
          <StyleFilterIcon src={slider} alt={"篩選條件"} />
        </StyleFilterTilte>

        {selectIndustry !== "" ||
        selectTitle !== "" ||
        selectLanguage !== "" ? (
          <StyleTagDisplayArea layer={layer}>
            {selectIndustry !== "" ? (
              <StyleTag>
                <StyleValue>{selectIndustry.value}</StyleValue>
                <StyleRemove onClick={() => setSelectIndustry("")} />
              </StyleTag>
            ) : null}
            {selectTitle !== "" ? (
              <StyleTag>
                <StyleValue>{selectTitle.value}</StyleValue>
                <StyleRemove onClick={() => setSelectTitle("")} />
              </StyleTag>
            ) : null}
            {selectLanguage !== "" ? (
              <StyleTag>
                <StyleValue>{selectLanguage.value}</StyleValue>
                <StyleRemove onClick={() => setSelectLanguage("")} />
              </StyleTag>
            ) : null}
          </StyleTagDisplayArea>
        ) : null}

        <StyleForm layer={layer}>
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
        </StyleForm>
      </StyleSticky>
    </StyleSidebar>
  );
};

export default Sidebar;
