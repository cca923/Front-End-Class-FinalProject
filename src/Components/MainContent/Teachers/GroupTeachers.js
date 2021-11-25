import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../../utils/firebase";
import { nanoid } from "nanoid";
import noPhoto from "../../../images/resume-noPhoto.png";
import noResult from "../../../images/noResult.gif";
import loading from "../../../images/loading.gif";

const StyleGroupTeachers = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 40px;
  margin: 0 auto;
  padding: 50px 40px;

  @media only screen and (max-width: 1800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 30px;
  }

  @media only screen and (max-width: 1450px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
    padding: 40px;
  }
`;

const StyleEachTeacher = styled.a`
  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media only screen and (max-width: 1020px) {
    height: fit-content;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 780px) {
    height: fit-content;
    flex-direction: column;
  }

  @media only screen and (max-width: 650px) {
    height: fit-content;
  }

  :hover {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
    transform: scale(1.005);
    transition: all 0.3s;
  }
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: #e1e1e1;
  object-fit: cover;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0;

  @media only screen and (max-width: 780px) {
    padding: 15px 0;
  }
`;

const StyleAbout = styled.div`
  display: flex;

  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const StyleAboutDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  @media only screen and (max-width: 450px) {
    margin-left: 0px;
    margin-top: 15px;
  }
`;

const StyleName = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding-left: 8px;
`;

const StyleCompany = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  border-left: 2px solid #7367f0;
  padding-left: 8px;
`;

const StyleData = styled.span`
  font-size: 1rem;
  margin-top: 10px;
  border-left: 2px solid #7367f0;
  padding-left: 8px;
  line-height: 1.3rem;
`;

const StyleTagDisplayArea = styled.div`
  display: flex;
  margin-top: auto;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    /* margin-top: 15px; */
  }

  @media only screen and (max-width: 780px) {
    margin-top: 0;
  }

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
`;

const StyleStateWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyleNoResult = styled.img`
  width: 30%;
  margin: 20px auto 0;
  object-fit: cover;
`;

const StyleNpResultText = styled.div`
  width: 100%;
  margin: 10px auto;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #343434;

  @media only screen and (max-width: 1200px) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const StyleLoading = styled.img`
  width: 50%;
  margin: 0 auto;
  height: 350px;
  object-fit: cover;
`;

const GroupTeachers = (props) => {
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const [teachersData, setTeachersData] = useState();
  // console.log("所有老師", teachersData);

  useEffect(() => {
    teachersCollection
      .get()
      .then((collectionSnapShot) => {
        const arrTeachers = [];

        collectionSnapShot.forEach((doc) => {
          if (
            // 資料都有的老師再呈現在頁面上
            doc.data().tag &&
            doc.data().about &&
            doc.data().talents &&
            doc.data().experience &&
            doc.data().time && // 有填寫可預約時間的
            doc.data().time.length !== 0 && // 沒有被全部預約完讓 time = [ ] 的
            doc
              .data()
              .time.map((data) => {
                return new Date(data);
              })
              .filter((data) => {
                return data > new Date();
              }).length !== 0 // 不能出現 time 仍有時間，但都已經過期的老師
          ) {
            arrTeachers.push(doc.data());
          }
        });

        setTeachersData(arrTeachers);
      })
      .catch((error) => {
        console.log("無法讀取數據：", error);
      });
  }, []);

  // 確認老師的 Tag 是否完全包含「選擇的 Tag」
  const checker = (arr, targetTag) =>
    targetTag.every((option) => arr.includes(option));

  const targetTag = [];
  if (props.selectIndustry !== "") {
    targetTag.push(props.selectIndustry.value);
  }
  if (props.selectTitle !== "") {
    targetTag.push(props.selectTitle.value);
  }
  if (props.selectLanguage !== "") {
    targetTag.push(props.selectLanguage.value);
  }
  // console.log(targetTag);

  // 拿掉 teachersData initial state 從 [] 改成 undefined
  // 因為一開始會 undefined，所以給 ? ，然後再進行判斷！
  const filterResult = teachersData?.filter((teacher) => {
    if (
      props.selectIndustry === "" &&
      props.selectTitle === "" &&
      props.selectLanguage === ""
    ) {
      return teachersData;
    } else {
      const teacherTag = [];
      teacherTag.push(teacher.tag.industry);
      teacherTag.push(teacher.tag.title);
      teacherTag.push(teacher.tag.language);

      return checker(teacherTag, targetTag);
    }
  });

  return filterResult ? (
    <>
      {filterResult.length !== 0 ? (
        <StyleGroupTeachers>
          {filterResult.map((teacher) => {
            return (
              <StyleEachTeacher
                key={nanoid()}
                as={Link}
                to={`/teachers/${teacher.uid}`}>
                <StyleAbout>
                  <StyleImage
                    alt={teacher.name}
                    src={teacher.photo || noPhoto}
                  />
                  <StyleAboutDetail>
                    <StyleName>{teacher.name}</StyleName>
                    <StyleCompany>{teacher.about.presentCompany}</StyleCompany>
                    <StyleCompany>{teacher.about.presentTitle}</StyleCompany>
                  </StyleAboutDetail>
                </StyleAbout>

                <StyleDetail>
                  {teacher.talents.map((talent) => {
                    return (
                      <StyleData key={nanoid()}>{talent.description}</StyleData>
                    );
                  })}
                </StyleDetail>

                <StyleTagDisplayArea>
                  <StyleTag>
                    <StyleValue>{teacher.tag.industry}</StyleValue>
                  </StyleTag>
                  <StyleTag>
                    <StyleValue>{teacher.tag.title}</StyleValue>
                  </StyleTag>
                  <StyleTag>
                    <StyleValue>{teacher.tag.language}</StyleValue>
                  </StyleTag>
                </StyleTagDisplayArea>
              </StyleEachTeacher>
            );
          })}
        </StyleGroupTeachers>
      ) : (
        <StyleStateWrap>
          <StyleNoResult src={noResult} alt={"No Result"} />
          <StyleNpResultText>No Result｜找不到符合條件的前輩</StyleNpResultText>
        </StyleStateWrap>
      )}
    </>
  ) : (
    <StyleStateWrap>
      <StyleLoading src={loading} alt={"Loading"} />
    </StyleStateWrap>
  );
};

export default GroupTeachers;
