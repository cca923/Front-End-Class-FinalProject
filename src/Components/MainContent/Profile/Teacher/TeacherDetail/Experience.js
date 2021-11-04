import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Select from "react-select";
import firebase from "../../../../../utils/config/firebase-config";

const StyleTeacherExperience = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
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

const StyleInput = styled.input`
  padding: 5px;
  width: 200px;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;

  @media only screen and (max-width: 1020px) {
    width: 100%;
  }
`;

const StyleData = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const StyleEachContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1020px) {
    padding: 5px;
    flex-direction: row;
  }

  @media only screen and (max-width: 650px) {
    flex-direction: column;
  }
`;

const StyleExperienceLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px;

  @media only screen and (max-width: 1020px) {
    width: 300px;
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

const StyleSelect = styled(Select)`
  width: 150px;

  @media only screen and (max-width: 1020px) {
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

const StyleDeleteButton = styled.div`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 30px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-image: url("/images/trash.png");

  &:hover {
    background-image: url("/images/trash-hover.gif");
  }
`;

const TeacherExperience = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const experienceData = identityData.experience;
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayExperience, setDisplayExperience] = useState(false);
  // teachersRef.update({ experience });

  const handleExperienceDisplay = () => {
    const newExperience = {
      company,
      title,
      startDate,
      endDate,
    };
    // setExperience((existData) => [...existData, newExperience]);

    teachersRef
      .update({
        experience: firebase.firestore.FieldValue.arrayUnion(newExperience),
      })
      .then(() => {
        setDisplayExperience(true);
        setCompany("");
        setTitle("");
        setStartDate("");
        setEndDate("");
      });
  };

  const handleExperienceDelete = (e) => {
    const removeTarget = e.target.previousSibling.childNodes[1].textContent;
    const removeExperience = experienceData.filter((existDate) => {
      if (existDate.endDate === removeTarget) {
        return true; // filter 出來是 Array
      } else {
        return false;
      }
    });

    teachersRef.update({
      experience: firebase.firestore.FieldValue.arrayRemove(
        ...removeExperience
      ),
    });
  };

  // Global: 讓 Data 按時間大到小排序
  // const newToOld = () => {
  //   experienceData.sort((a, b) => {
  //     return a.endDate < b.endDate ? 1 : -1;
  //   });
  // };
  // newToOld();
  // const [selectTimeRange, setSelectTimeRange] = useState("");
  // const timeRange = [
  //   { value: "新到舊", label: "新到舊" },
  //   { value: "舊到新", label: "舊到新" },
  // ];
  // const handleTimeRange = (tag) => {
  //   setSelectTimeRange(tag);

  //   if (selectTimeRange.value === "新到舊") {
  //     newToOld();
  //   } else if (selectTimeRange.value === "舊到新") {
  //     experienceData.sort((a, b) => {
  //       return a.endDate > b.endDate ? 1 : -1;
  //     });
  //   }
  // };

  useEffect(() => {
    // 初始狀態
    if (experienceData) {
      setDisplayExperience(true);

      // Global: 讓 Data 按時間大到小排序
      experienceData.sort((a, b) => {
        return a.endDate < b.endDate ? 1 : -1;
      });
    }
  }, [experienceData]);

  return (
    <StyleTeacherExperience>
      <StyleEachDetail>
        <StyleSubtitle>工作經歷｜Experience</StyleSubtitle>
        <StyleContainer>
          <StyleData>
            <StyleEachContainer>
              <StyleExperienceLabel>公司名稱｜Company</StyleExperienceLabel>
              <StyleInput
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                placeholder="請輸入公司名稱"
                required></StyleInput>
            </StyleEachContainer>
            <StyleEachContainer>
              <StyleExperienceLabel>職業稱謂｜Title</StyleExperienceLabel>
              <StyleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="請輸入職稱"
                required></StyleInput>
            </StyleEachContainer>
            <StyleEachContainer>
              <StyleExperienceLabel>起始日期｜Start Date</StyleExperienceLabel>
              <StyleInput
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                required
              />
            </StyleEachContainer>
            <StyleEachContainer>
              <StyleExperienceLabel>終止日期｜End Date</StyleExperienceLabel>
              <StyleInput
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                required
              />
            </StyleEachContainer>
          </StyleData>
          <StyleTagSubmitButton onClick={handleExperienceDisplay}>
            送出
          </StyleTagSubmitButton>

          {displayExperience ? (
            <StyleDisplay>
              {/* <StyleSelect
                value={selectTimeRange}
                onChange={handleTimeRange}
                options={timeRange}
                placeholder={"時間排序"}
              /> */}
              {experienceData.map((job) => {
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
                    <StyleDeleteButton onClick={handleExperienceDelete} />
                  </StyleJob>
                );
              })}
            </StyleDisplay>
          ) : null}
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherExperience>
  );
};

export default TeacherExperience;
