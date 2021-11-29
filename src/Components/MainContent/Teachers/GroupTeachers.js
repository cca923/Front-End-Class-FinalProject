import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";

import { fetchAllTeachersData } from "../../../utils/firebase";

import noPhoto from "../../../images/no-photo-square.png";
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

const GroupTeachers = ({ selectIndustry, selectTitle, selectLanguage }) => {
  const [teachersData, setTeachersData] = useState();

  useEffect(() => {
    fetchAllTeachersData().then((docs) => {
      const arrTeachers = [];

      docs.forEach((doc) => {
        if (
          doc.data().tag &&
          doc.data().about &&
          doc.data().talents &&
          doc.data().experience &&
          doc.data().time &&
          doc.data().time.length !== 0 &&
          doc
            .data()
            .time.map((data) => {
              return new Date(data);
            })
            .filter((data) => {
              return data > new Date();
            }).length !== 0 // cause doc.data().time might remain expiration time
        ) {
          arrTeachers.push(doc.data());
        }
      });

      setTeachersData(arrTeachers);
    });
  }, []);

  const isSameTag = (arr, targetTag) =>
    targetTag.every((option) => arr.includes(option));

  const targetTag = [];
  if (selectIndustry !== "") {
    targetTag.push(selectIndustry.value);
  }
  if (selectTitle !== "") {
    targetTag.push(selectTitle.value);
  }
  if (selectLanguage !== "") {
    targetTag.push(selectLanguage.value);
  }

  const filterResult = teachersData?.filter((teacher) => {
    if (selectIndustry === "" && selectTitle === "" && selectLanguage === "") {
      return teachersData;
    } else {
      const teacherTag = [];
      teacherTag.push(teacher.tag.industry);
      teacherTag.push(teacher.tag.title);
      teacherTag.push(teacher.tag.language);

      return isSameTag(teacherTag, targetTag);
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
