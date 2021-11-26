import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { compareAsc } from "date-fns";
import { nanoid } from "nanoid";
import {
  arrayRemove,
  arrayUnion,
  updateStudentData,
  updateTeacherData,
} from "../../../../utils/firebase";
import {
  handleConfirmedWithPopup,
  reserveTimeSucceedAlert,
} from "../../../../utils/swal";

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #9092db;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 300px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;
`;

const StyleContainer = styled.div`
  height: 100%;
  background-color: #fff;
  border-top: 2px solid #8e94f2;
  border-radius: 20px;
  padding: 25px 30px 20px;
`;

const StyleEachDetail = styled.div`
  width: 100%;
  position: relative;
  padding: 28px 0;
  overflow-y: scroll;
`;

const StyleAvailableTimeContainer = styled.div`
  padding: 20px;
  background-color: #f3f3f3;
  margin: 20px;
  border-radius: 20px;
`;

const StyleEachAvailableTime = styled.div`
  background-color: white;
  width: 90%;
  padding: 10px;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
  cursor: pointer;
`;

const StyleAvailableTime = styled.div`
  line-height: 30px;
  font-size: 1.1rem;
  margin-right: auto;
`;

const Calender = ({ eachTeacherData }) => {
  const history = useHistory();
  const identityData = useSelector((state) => state.identityData);

  const handleReserve = async (e) => {
    const targetDateId = e.target.id; // 時間
    const targetDate = eachTeacherData.time.filter((date) => {
      return String(new Date(date)) === targetDateId;
    });
    const targetDateValue = new Date(targetDate[0]).toLocaleString(
      navigator.language,
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    const reserveTime = await handleConfirmedWithPopup(
      `預約時段｜${targetDateValue}`,
      `預約對象｜${eachTeacherData.name}`,
      "Confirm｜確認",
      "/images/theme/theme-14.png"
    );
    if (reserveTime.isConfirmed) {
      const teacherReservation = {
        email: identityData.email,
        time: targetDate[0],
      };
      await updateTeacherData(eachTeacherData.email, {
        reservation: arrayUnion(teacherReservation),
      });

      await updateTeacherData(eachTeacherData.email, {
        time: arrayRemove(targetDate[0]),
      });

      const studentReservation = {
        email: eachTeacherData.email,
        time: targetDate[0],
      };
      await updateStudentData(identityData.email, {
        reservation: arrayUnion(studentReservation),
      });

      reserveTimeSucceedAlert(targetDateValue).then(() => {
        history.push("/profile/myclass");
      });
    }
  };

  return (
    <StyleEachDetail>
      <StyleSubtitle>可預約時間｜Available Time</StyleSubtitle>
      <StyleContainer>
        <StyleAvailableTimeContainer>
          {eachTeacherData.time
            .map((data) => {
              return new Date(data);
            })
            .filter((data) => {
              return data > new Date();
            })
            .sort(compareAsc)
            .map((date) => {
              return (
                <StyleEachAvailableTime
                  key={nanoid()}
                  id={date}
                  onClick={(e) => handleReserve(e)}>
                  <StyleAvailableTime>
                    {date.toLocaleString(navigator.language, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </StyleAvailableTime>
                </StyleEachAvailableTime>
              );
            })}
        </StyleAvailableTimeContainer>
      </StyleContainer>
    </StyleEachDetail>
  );
};

export default Calender;
