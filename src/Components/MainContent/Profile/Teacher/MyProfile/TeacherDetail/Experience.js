import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Select from "react-select";
import Swal from "sweetalert2";
import firebase from "../../../../../../utils/config/firebase-config";

const StyleTeacherExperience = styled.div`
  width: 100%;
  padding: 0 20px;

  @media only screen and (max-width: 660px) {
    padding: 0 3px;
  }
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
`;

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #9092db;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 250px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;

  @media only screen and (max-width: 600px) {
    width: 200px;
    font-size: 1.1rem;
  }
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #f3f3f3;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 50px 30px 20px 30px;
`;

const StyleDisplay = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

const StyleInput = styled.input`
  font-size: 1rem;
  padding: 5px;
  width: 200px;
  height: 40px;
  border: 2px solid #e4e5e1;
  border-radius: 8px;

  @media only screen and (max-width: 1460px) {
    width: 100%;
  }
`;

const StyleData = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 1460px) {
    flex-direction: column;
  }
`;

const StyleEachContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1460px) {
    padding: 5px 0;
    flex-direction: row;
  }

  @media only screen and (max-width: 770px) {
    flex-direction: column;
  }
`;

const StyleExperienceLabel = styled.label`
  font-size: 1.2rem;
  padding: 10px 3px;

  @media only screen and (max-width: 1460px) {
    min-width: 210px;
  }

  @media only screen and (max-width: 770px) {
    padding: 10px 3px 5px;
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

const StyleSelect = styled(Select)`
  width: 220px;
  margin-left: 20px;

  @media only screen and (max-width: 770px) {
    margin-left: 0;
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
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;

  @media only screen and (max-width: 770px) {
    margin: 20px 0;
    padding: 5px 15px;
  }
`;

const StyleJobData = styled.div`
  display: flex;
  padding: 5px 0;

  @media only screen and (max-width: 770px) {
    flex-direction: column;
  }
`;

const StyleJobLabel = styled.div`
  min-width: 180px;
  color: #898292;
  padding: 2px 0;
  line-height: 24px;
`;

const StyleJobValue = styled.div`
  font-weight: 600;
  color: black;
  width: 100%;
  margin-left: 10px;
  line-height: 28px;

  @media only screen and (max-width: 770px) {
    margin-left: 0;
  }
`;

const StyleDeleteButton = styled.div`
  cursor: pointer;
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

  @media only screen and (max-width: 770px) {
    right: 5px;
  }
`;

const TeacherExperience = () => {
  const identityData = useSelector((state) => state.identityData);
  const experienceData = identityData.experience;

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startMaxDate = useRef();
  const endMaxDate = useRef();

  const handleExperienceDisplay = () => {
    if (
      company.length === 0 ||
      title.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0
    ) {
      Swal.fire({
        title: "請輸入完整工作經歷！",
        icon: "warning",
        customClass: {
          confirmButton: "confirm__button",
        },
      });
    } else {
      const newExperience = {
        company,
        title,
        startDate,
        endDate,
      };

      teachersRef
        .update({
          experience: firebase.firestore.FieldValue.arrayUnion(newExperience),
        })
        .then(() => {
          Swal.fire({
            title: "新增成功！",
            icon: "success",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setCompany("");
          setTitle("");
          setStartDate("");
          setEndDate("");
        });
    }
  };

  const handleExperienceDelete = (e) => {
    const removeTarget = e.target.previousSibling.childNodes[1].textContent;

    Swal.fire({
      title: "移除該項工作經歷？",
      icon: "warning",
      confirmButtonText: "Remove｜移除",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      cancelButtonText: "Cancel｜取消",
      customClass: {
        confirmButton: "confirm__button",
        cancelButton: "cancel__button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const removeExperience = experienceData.filter((existDate) => {
          return existDate.endDate.replace(/-/g, "/") === removeTarget;
        });

        teachersRef
          .update({
            experience: firebase.firestore.FieldValue.arrayRemove(
              ...removeExperience
            ),
          })
          .then(() => {
            Swal.fire({
              title: "移除成功",
              icon: "success",
              timer: 1200,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  const [selectTimeOrder, setSelectTimeOrder] = useState("");
  const timeRange = [
    { value: "新到舊", label: "新到舊" },
    { value: "舊到新", label: "舊到新" },
  ];
  const handleTimeOrder = (tag) => {
    setSelectTimeOrder(tag);
  };

  useEffect(() => {
    startMaxDate.current.max = new Date().toISOString().split("T")[0];
    endMaxDate.current.max = new Date().toISOString().split("T")[0];
  }, []);

  return (
    <StyleTeacherExperience>
      <StyleEachDetail>
        <StyleSubtitle>工作經歷｜Experience</StyleSubtitle>
        <StyleContainer>
          {experienceData ? (
            <StyleDisplay>
              <StyleSelect
                value={selectTimeOrder}
                onChange={handleTimeOrder}
                options={timeRange}
                placeholder={"時間排序預設：新到舊"}
              />
              {experienceData
                .sort((a, b) => {
                  if (selectTimeOrder.value === "新到舊") {
                    return a.endDate < b.endDate ? 1 : -1;
                  } else if (selectTimeOrder.value === "舊到新") {
                    return a.endDate > b.endDate ? 1 : -1;
                  } else {
                    return a.endDate < b.endDate ? 1 : -1; // 預設
                  }
                })
                .map((job) => {
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
                        <StyleJobValue>
                          {job.startDate.replace(/-/g, "/")}
                        </StyleJobValue>
                      </StyleJobData>
                      <StyleJobData>
                        <StyleJobLabel>終止日期｜End Date</StyleJobLabel>
                        <StyleJobValue>
                          {job.endDate.replace(/-/g, "/")}
                        </StyleJobValue>
                      </StyleJobData>
                      <StyleDeleteButton onClick={handleExperienceDelete} />
                    </StyleJob>
                  );
                })}
            </StyleDisplay>
          ) : null}

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
                ref={startMaxDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                required
              />
            </StyleEachContainer>
            <StyleEachContainer>
              <StyleExperienceLabel>終止日期｜End Date</StyleExperienceLabel>
              <StyleInput
                ref={endMaxDate}
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
        </StyleContainer>
      </StyleEachDetail>
    </StyleTeacherExperience>
  );
};

export default TeacherExperience;
