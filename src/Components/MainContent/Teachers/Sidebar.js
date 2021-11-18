import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
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
    display: ${(props) => (props.layer ? "flex" : "none")};
    /* Display 和 transition 有衝突 */
    visibility: ${(props) => (props.layer ? "visible" : "hidden")};
    opacity: ${(props) => (props.layer ? "1" : "0")};
    height: ${(props) => (props.layer ? "58vh" : "0")};
    width: 100%;
    padding: 10px 40px 20px 40px;
    top: 0;
    transition: 0.5s;
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
    padding: 5px 0;
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

const Sidebar = (props) => {
  const [layer, setLayer] = useState(false);

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
    props.setSelectIndustry(tag);
    props.setDisplayTag(true);
  };
  const handleTitleChange = (tag) => {
    props.setSelectTitle(tag);
    props.setDisplayTag(true);
  };
  const handleLanguageChange = (tag) => {
    props.setSelectLanguage(tag);
    props.setDisplayTag(true);
  };

  if (
    props.selectIndustry === "" &&
    props.selectTitle === "" &&
    props.selectLanguage === ""
  ) {
    props.setDisplayTag(false);
  }

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

        {props.displayTag ? (
          <StyleTagDisplayArea layer={layer}>
            {props.selectIndustry !== "" ? (
              <StyleTag>
                <StyleValue>{props.selectIndustry.value}</StyleValue>
                <StyleRemove
                  onClick={() => {
                    props.setSelectIndustry("");
                  }}
                />
              </StyleTag>
            ) : null}
            {props.selectTitle !== "" ? (
              <StyleTag>
                <StyleValue>{props.selectTitle.value}</StyleValue>
                <StyleRemove
                  onClick={() => {
                    props.setSelectTitle("");
                  }}
                />
              </StyleTag>
            ) : null}
            {props.selectLanguage !== "" ? (
              <StyleTag>
                <StyleValue>{props.selectLanguage.value}</StyleValue>
                <StyleRemove
                  onClick={() => {
                    props.setSelectLanguage("");
                  }}
                />
              </StyleTag>
            ) : null}
          </StyleTagDisplayArea>
        ) : null}

        <StyleForm layer={layer}>
          <StyleData>
            <StyleTagContainer>
              <StyleLabel>產業｜Industry</StyleLabel>
              <StyleSelect
                value={props.selectIndustry}
                onChange={handleIndustryChange}
                options={industryOptions}
                placeholder={"請選擇產業別"}
              />
            </StyleTagContainer>

            <StyleTagContainer>
              <StyleLabel>職業稱謂｜Title</StyleLabel>
              <StyleSelect
                value={props.selectTitle}
                onChange={handleTitleChange}
                options={titleOptions}
                placeholder={"請選擇職業稱謂"}
              />
            </StyleTagContainer>

            <StyleTagContainer>
              <StyleLabel>履歷批改語言｜Language</StyleLabel>
              <StyleSelect
                value={props.selectLanguage}
                onChange={handleLanguageChange}
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
