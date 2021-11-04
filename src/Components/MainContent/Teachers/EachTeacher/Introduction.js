import { nanoid } from "nanoid";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import firebase from "../../../../utils/config/firebase-config";

const StyleIntroduction = styled.div`
  width: 100%;
  height: fit-content;
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
`;

const StyleTeacher = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 25px;
  padding: 20px;
`;

const StyleImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: grey;
  border-radius: 50%;
  margin: auto 20px auto 10px;

  @media only screen and (max-width: 1300px) {
    width: 100px;
    height: 100px;
    margin: auto 20px auto 10px;
  }
`;

const StyleAbout = styled.div`
  display: flex;
`;

const StyleAboutDetail = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: center;
  padding-right: 20px;
  border-right: 2px solid #c4bccf;

  @media only screen and (max-width: 800px) {
    width: 300px;
  }
`;

const StyleName = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  padding-left: 8px;

  @media only screen and (max-width: 1300px) {
    font-size: 1.8rem;
    font-weight: 600;
    padding-left: 8px;
  }
`;

const StyleCompany = styled.div`
  font-size: 1.5rem;
  margin-top: 15px;
  border-left: 2px solid #7678ed;
  padding-left: 8px;

  @media only screen and (max-width: 1300px) {
    font-size: 1.2rem;
    margin-top: 10px;
    border-left: 2px solid #7678ed;
    padding-left: 8px;
  }
`;

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #898292;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 250px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #f8f3f8;
  border-top: 2px solid #898292;
  border-radius: 20px;
  padding: 50px 30px 20px 30px;
`;

const StyleDisplay = styled.div`
  width: 100%;
`;

const StyleAboutDisplay = styled.div`
  padding: 20px 0;
`;

const StyleAboutLabel = styled.div`
  width: 300px;
  padding: 5px 0;
  color: #898292;
  font-size: 1.5rem;
  font-weight: 800;

  @media only screen and (max-width: 1300px) {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const StyleAboutData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  padding-left: 20px;
`;

const StyleAboutMeData = styled.div`
  max-width: 100%;
  height: fit-content;
  word-wrap: break-word;
  padding-top: 5px;
  font-size: 1.2rem;
  margin-top: 10px;

  @media only screen and (max-width: 1300px) {
    font-size: 1rem;
    margin-top: 0px;
  }
`;

const StyleLabel = styled.label`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;
  color: grey;
  border-bottom: 2px solid #898292;
  margin-bottom: 5px;
`;

const StyleTalentDisplayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const StyleTalentDisplay = styled.div`
  margin: 20px 0 10px 0;
  padding: 5px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 239px;

  @media only screen and (max-width: 900px) {
    width: 100%;
    margin: 10px 0 5px 0;
  }
`;

const StyleTalentDisplayLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
  color: black;
  margin-left: 10px;
`;

const StyleTalentDisplayText = styled.div`
  width: 199px;
  margin-top: 5px;
  padding: 0 3px;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const StyleJob = styled.div`
  background-color: #fff;
  margin: 20px;
  padding: 5px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyleJobData = styled.div`
  display: flex;
  padding: 5px 0;
`;

const StyleJobLabel = styled.div`
  width: 200px;
  color: #898292;
  padding: 2px 0;
  line-height: 24px;
`;

const StyleJobValue = styled.div`
  color: black;
  width: 100%;
  margin-left: 10px;
  line-height: 24px;
`;

const Introduction = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const [teacherData, setTeacherData] = useState({
    about: {},
    talents: [],
    experience: [],
  });
  console.log("該老師的資料！", teacherData);
  const { teacherUid } = useParams();

  useEffect(() => {
    teachersCollection
      .where("uid", "==", teacherUid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTeacherData(doc.data());
        });
      })
      .catch((error) => {
        console.log("資料讀取錯誤", error);
      });
  }, []);

  return (
    <StyleIntroduction>
      <StyleEachDetail>
        <StyleTeacher>
          <StyleAbout>
            <StyleImage src={teacherData.photo} alt={teacherData.name} />
            <StyleAboutDetail>
              <StyleName>{teacherData.name}</StyleName>
              <StyleCompany>{teacherData.about.presentCompany}</StyleCompany>
              <StyleCompany>{teacherData.about.presentTitle}</StyleCompany>
            </StyleAboutDetail>
            <StyleAboutData>
              <StyleAboutLabel>個人介紹｜Introduction</StyleAboutLabel>
              <StyleAboutMeData>
                {teacherData.about.introduction}
              </StyleAboutMeData>
            </StyleAboutData>
          </StyleAbout>
        </StyleTeacher>
      </StyleEachDetail>

      <StyleEachDetail>
        <StyleSubtitle>擅長技能｜Talent</StyleSubtitle>
        <StyleContainer>
          <StyleTalentDisplayContainer>
            {teacherData.talents.map((talent, index) => {
              return (
                <StyleTalentDisplay key={nanoid()}>
                  <StyleLabel>
                    {index + 1}.
                    <StyleTalentDisplayLabel>
                      {talent.title}
                    </StyleTalentDisplayLabel>
                  </StyleLabel>
                  <StyleTalentDisplayText>
                    {talent.description}
                  </StyleTalentDisplayText>
                </StyleTalentDisplay>
              );
            })}
          </StyleTalentDisplayContainer>
        </StyleContainer>
      </StyleEachDetail>

      <StyleEachDetail>
        <StyleSubtitle>工作經歷｜Experience</StyleSubtitle>
        <StyleContainer>
          <StyleDisplay>
            {teacherData.experience.map((job) => {
              return (
                <StyleJob key={nanoid()}>
                  <StyleJobData>
                    <StyleJobLabel>公司名稱｜Company</StyleJobLabel>
                    <StyleJobValue>{job.company}</StyleJobValue>
                  </StyleJobData>
                  <StyleJobData>
                    <StyleJobLabel>職業稱謂｜Title</StyleJobLabel>
                    <StyleJobValue>{job.title}</StyleJobValue>
                  </StyleJobData>
                  <StyleJobData>
                    <StyleJobLabel>起始日期｜Start Date</StyleJobLabel>
                    <StyleJobValue>{job.startDate}</StyleJobValue>
                  </StyleJobData>
                  <StyleJobData>
                    <StyleJobLabel>終止日期｜End Date</StyleJobLabel>
                    <StyleJobValue>{job.endDate}</StyleJobValue>
                  </StyleJobData>
                </StyleJob>
              );
            })}
          </StyleDisplay>
        </StyleContainer>
      </StyleEachDetail>
    </StyleIntroduction>
  );
};

export default Introduction;
