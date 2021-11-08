import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../../utils/config/firebase-config";
import { nanoid } from "nanoid";

const StyleGroupTeachers = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 40px;
  margin: 0 auto;
  padding: 50px 40px;

  @media only screen and (max-width: 1800px) {
    /* width: 100%; */
    /* height: 100%; */
    /* display: grid; */
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 30px;
  }

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
    padding: 40px;
  }
`;

const StyleEachTeacher = styled.a`
  width: 100%;
  /* height: fit-content; */
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
    /* flex-direction: column; */
  }
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: grey;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0;

  @media only screen and (max-width: 1020px) {
    /* width: fit-content; */
    /* padding: 10px 0 0 30px; */
  }

  @media only screen and (max-width: 780px) {
    padding: 15px 0;
  }
`;

const StyleAbout = styled.div`
  display: flex;
`;

const StyleAboutDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const StyleName = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding-left: 8px;
`;

const StyleCompany = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
  border-left: 2px solid #7678ed;
  padding-left: 8px;
`;

const StyleData = styled.span`
  font-size: 1rem;
  margin-top: 10px;
  border-left: 2px solid #7678ed;
  padding-left: 8px;
`;

const StyleTagDisplayArea = styled.div`
  display: flex;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    /* margin-top: 15px; */
  }

  @media only screen and (max-width: 780px) {
    margin-top: 0;
  }
`;

const StyleTag = styled.div`
  background-color: #bbadff;
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
`;

const StyleValue = styled.div`
  line-height: 20px;
`;

const GroupTeachers = (props) => {
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const [teachersData, setTeachersData] = useState([]);
  console.log("所有老師", teachersData);
  const teachersFilterData = [];

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
            doc.data().time.length !== 0 // 沒有被全部預約完讓 time = [ ] 的
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

  if (
    props.selectIndustry === "" &&
    props.selectTitle === "" &&
    props.selectLanguage === ""
  ) {
    // 如果沒有 tag 就顯示 firebase 全部的資料
    teachersFilterData.push(...teachersData);
  } else {
    // 如果有 tag 就篩選出符合條件的資料
    const matchData = teachersData.filter((teacher) => {
      if (props.selectIndustry.value === teacher.tag.industry) {
        return true;
      } else if (props.selectTitle.value === teacher.tag.title) {
        return true;
      } else if (props.selectLanguage.value === teacher.tag.language) {
        return true;
      } else {
        return false;
      }
    });

    teachersFilterData.push(...matchData);
  }

  return (
    <StyleGroupTeachers>
      {teachersFilterData.map((teacher) => {
        return (
          <StyleEachTeacher
            key={nanoid()}
            as={Link}
            to={`/teachers/${teacher.uid}`}>
            <StyleAbout>
              <StyleImage alt={teacher.name} src={teacher.photo} />
              <StyleAboutDetail>
                <StyleName>{teacher.name}</StyleName>
                <StyleCompany>{teacher.about.presentCompany}</StyleCompany>
                <StyleCompany>{teacher.about.presentTitle}</StyleCompany>
              </StyleAboutDetail>
            </StyleAbout>

            <StyleDetail>
              {teacher.talents.map((talent) => {
                return <StyleData>{talent.description}</StyleData>;
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
  );
};

export default GroupTeachers;
