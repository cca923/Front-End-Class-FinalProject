import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { compareAsc } from "date-fns";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import firebase from "../../../../utils/firebase";

const StyleCalender = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f3f3f3;
  border-radius: 25px;
  /* padding: 20px; */
  overflow-y: scroll;
`;

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

const Calender = (props) => {
  const history = useHistory();
  const identityData = useSelector((state) => state.identityData);
  console.log("學生的email", identityData.email);
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const studentsCollection = db.collection("students");

  const teacherName = props.teacherData.name;
  const teacherEmail = props.teacherData.email;
  const teacherTimeData = props.teacherData.time;

  const handleReserve = (e) => {
    const targetDateId = e.target.id;
    // console.log(targetDateId); // 時間
    const targetDate = teacherTimeData.filter((date) => {
      return String(new Date(date)) === targetDateId;
    });
    // console.log(targetDate[0]);

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

    Swal.fire({
      title: `預約時段｜${targetDateValue}`,
      html: `<h3>預約對象｜${teacherName}</h3>`,
      confirmButtonText: "Confirm｜確認",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      cancelButtonText: "Cancel｜取消",
      customClass: {
        confirmButton: "confirm__button",
        cancelButton: "cancel__button",
      },
      imageUrl: "/images/theme/theme-14.png",
      imageWidth: 130,
      imageAlt: "theme image",
    }).then((result) => {
      if (result.isConfirmed) {
        // 老師加上 reservation [ { 學生 email, 預約time } ]
        const teacherReservation = {
          email: identityData.email,
          time: targetDate[0],
        };
        teachersCollection.doc(teacherEmail).update({
          reservation:
            firebase.firestore.FieldValue.arrayUnion(teacherReservation),
        });

        // 老師移除 time []
        teachersCollection.doc(teacherEmail).update({
          time: firebase.firestore.FieldValue.arrayRemove(targetDate[0]),
        });

        // 學生加上 reservation [ { 老師 email, 預約time } ]
        const studentReservation = {
          email: teacherEmail,
          time: targetDate[0],
        };
        studentsCollection
          .doc(identityData.email)
          .update({
            reservation:
              firebase.firestore.FieldValue.arrayUnion(studentReservation),
          })
          .then(() => {
            Swal.fire({
              title: "預約成功！",
              text: `預約時段｜${targetDateValue}`,
              icon: "success",
              customClass: {
                confirmButton: "confirm__button",
              },
            }).then(() => {
              history.push("/profile/myclass");
            });
          });
      }
    });
  };

  return (
    <StyleEachDetail>
      <StyleSubtitle>可預約時間｜Available Time</StyleSubtitle>
      <StyleContainer>
        <StyleAvailableTimeContainer>
          {teacherTimeData
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
                  onClick={(e) => {
                    handleReserve(e);
                  }}>
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
