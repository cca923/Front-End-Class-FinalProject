import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { compareAsc } from "date-fns";
import firebase from "../../../../utils/config/firebase-config";

const StyleCalender = styled.div`
  width: 100%;
  height: 500px;
  background-color: #aca5b6;
  border-radius: 25px;
  /* padding: 20px; */
  overflow-y: scroll;
`;

const StyleAvailableTimeTitle = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #898292;
  font-size: 1.2rem;
  font-weight: 700;
  font-size: 2.5rem;
  color: #fff;
  border-radius: 25px 25px 0 0;
`;

const StyleAvailableTimeContainer = styled.div`
  padding: 20px;
  /* background-color: #fff; */
  margin: 20px;
`;

const StyleEachAvailableTime = styled.div`
  background-color: white;
  width: 90%;
  padding: 10px;
  margin: 0 auto 15px auto;
  display: flex;
  cursor: pointer;
`;

const StyleAvailableTime = styled.div`
  line-height: 30px;
  font-size: 1.1rem;
  margin-right: auto;
`;

const Calender = () => {
  const identityData = useSelector((state) => state.identityData);
  console.log("學生的email", identityData.email);
  const db = firebase.firestore();
  const teachersCollection = db.collection("teachers");
  const studentsCollection = db.collection("students");

  const [teacherTimeData, setTeacherTimeData] = useState([]);
  const [teacherEmail, setTeacherEmail] = useState();
  console.log("該老師的可預約時間資料！", teacherTimeData);
  console.log("該老師的 Email", teacherEmail);
  const { teacherUid } = useParams();

  useEffect(() => {
    teachersCollection
      .where("uid", "==", teacherUid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTeacherEmail(doc.data().email);

          const timeDataConvert = [];
          doc.data().time.map((data) => {
            return timeDataConvert.push(new Date(data * 1000));
          });
          setTeacherTimeData(timeDataConvert);
        });
      })
      .catch((error) => {
        console.log("資料讀取錯誤", error);
      });
  }, []);

  const handleReserve = (e) => {
    const targetDateId = e.target.id;
    console.log(targetDateId); // 時間
    const targetDate = teacherTimeData.filter((date) => {
      return String(date) === targetDateId;
    });
    console.log(targetDate[0]);

    const confirm = window.confirm(`是否要預定 ${targetDateId}？`);
    if (confirm) {
      // 老師加上 reservation [ { 學生 email, 預約time } ]
      const teacherReservation = {
        email: identityData.email,
        time: targetDate[0].getTime() / 1000,
      };
      teachersCollection.doc(teacherEmail).update({
        reservation:
          firebase.firestore.FieldValue.arrayUnion(teacherReservation),
      });

      // 學生加上 reservation [ { 老師 email, 預約time } ]
      const studentReservation = {
        email: teacherEmail,
        time: targetDate[0].getTime() / 1000,
      };
      studentsCollection.doc(identityData.email).update({
        reservation:
          firebase.firestore.FieldValue.arrayUnion(studentReservation),
      });

      // 老師移除 time []
      teachersCollection.doc(teacherEmail).update({
        time: firebase.firestore.FieldValue.arrayRemove(
          targetDate[0].getTime() / 1000
        ),
      });
    }
  };

  return (
    <StyleCalender>
      <StyleAvailableTimeTitle>可預約時間</StyleAvailableTimeTitle>
      <StyleAvailableTimeContainer>
        {teacherTimeData.sort(compareAsc).map((date) => {
          return (
            <StyleEachAvailableTime
              key={date}
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
    </StyleCalender>
  );
};

export default Calender;
