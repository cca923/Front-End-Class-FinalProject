import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, compareAsc, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../css/calendar.css";
import firebase from "../../../../utils/config/firebase-config";

const StyleCalender = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const StyleDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media only screen and (max-width: 1020px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const StyleDatePickerButton = styled.button`
  width: 250px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border-radius: 20px;
  border: 2px solid #bbadff;
  padding: 10px;
  margin: 0 auto 20px auto;
  cursor: pointer;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const StyleAvailableTimeContainer = styled.div`
  width: 30%;
  height: 455px;
  background-color: #aca5b6;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    height: 250px;
  }
`;

const StyleAvailableTimeTitle = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #e4e5e1;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StyleEachAvailableTime = styled.div`
  background-color: white;
  width: 90%;
  padding: 10px;
  margin: 0 auto 15px auto;
  display: flex;
`;

const StyleAvailableTime = styled.div`
  line-height: 30px;
  font-size: 1.1rem;
  margin-right: auto;
`;

const StyleDeleteButton = styled.div`
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

const TeacherCalendar = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const timeData = identityData.time;
  const timeDataConvert = [];
  if (timeData) {
    timeData.map((data) => {
      return timeDataConvert.push(new Date(data * 1000));
    });
  }
  console.log("全部的時間", timeDataConvert);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);
  const [displaySchedule, setDisplaySchedule] = useState(false);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const [excludeTimes, setExcludeTimes] = useState([]);

  const timeList = document.querySelectorAll(
    ".react-datepicker__time-list-item"
  );
  const getAllTimes = (date) => {
    // for (let i = 0; i < timeDataConvert.length; i++) {
    //   if (timeDataConvert[i].getDate() === date.getDate()) {
    //     if (
    //       format(timeDataConvert[i], "HH:mm") === format(date, "HH:mm")
    //       // .map((existDate) => format(existDate, "HH:mm"))
    //       // .includes(format(date, "HH:mm"))
    //     ) {
    //       break;
    //     } else {
    //       console.log(date);
    //     }
    //   }
    // }

    // if (
    //   timeDataConvert
    //     .map((existDate) => existDate.getDate())
    //     .includes(date.getDate()) &&
    //   !timeDataConvert
    //     .map((existDate) => format(existDate, "HH:mm"))
    //     .includes(format(date, "HH:mm"))
    // ) {
    //   console.log(date);
    // }

    timeDataConvert.forEach((existDate) => {
      if (existDate.getDate() === date.getDate()) {
        if (
          !timeDataConvert
            .map((existDate) => format(existDate, "HH:mm"))
            .includes(format(date, "HH:mm"))
        ) {
          // console.log(date);
        }
      }
    });
  };

  // const getFirstSelectableTime = () => {
  //   timeList.forEach((time) => {
  //     time.classList.remove("react-datepicker__time-list-item--selected");
  //   });

  //   const selectableTime = Array.from(timeList).filter(
  //     (time) =>
  //       !time.classList.contains("react-datepicker__time-list-item--disabled")
  //   );
  //   selectableTime[0].classList.add(
  //     "react-datepicker__time-list-item--selected"
  //   );
  // };

  const addDateToSchedule = (e) => {
    if (startDate !== null) {
      teachersRef
        .update({
          time: firebase.firestore.FieldValue.arrayUnion(
            startDate.getTime() / 1000
          ),
        })
        .then(() => {
          // const timeList = document.querySelectorAll(
          //   ".react-datepicker__time-list-item"
          // );
          // const target = Array.from(timeList).filter(
          //   (time) => time.textContent === format(startDate, "HH:mm")
          // );
          // target[0].classList.add("react-datepicker__time-list-item--disabled");
          // target[0].classList.remove(
          //   "react-datepicker__time-list-item--selected"
          // );
          // const selectableTime = Array.from(timeList).filter(
          //   (time) =>
          //     !time.classList.contains(
          //       "react-datepicker__time-list-item--disabled"
          //     )
          // );
          // selectableTime[0].classList.add(
          //   "react-datepicker__time-list-item--selected"
          // );
        })
        .then(() => {
          window.alert("已成功加入可預約日曆中！");
        });
    }
  };

  // 依照 firebase 日期篩選選擇到的日期中要排除的時間
  const getExcludedTimes = (daytime) => {
    const arrExcludeTimes = [];

    timeDataConvert.forEach((existDate) => {
      if (existDate.getDate() === daytime.getDate()) {
        arrExcludeTimes.push(existDate);
        console.log("依照現有日期篩選要排除的日期", arrExcludeTimes);
      }

      setExcludeTimes(arrExcludeTimes);
    });
  };

  const deleteDateFromSchedule = (e) => {
    const confirmDelete = window.confirm("確定要從日曆中移除嗎？");
    if (confirmDelete) {
      const deleteTargetDate = e.target.previousSibling.id;
      const existDate = timeDataConvert.filter((existDate) => {
        return String(existDate) === deleteTargetDate;
      });

      // 從 firestore 中刪除，會自動恢復成可以被選取的狀態
      teachersRef.update({
        time: firebase.firestore.FieldValue.arrayRemove(
          existDate[0].getTime() / 1000
        ),
      });
    }
  };

  useEffect(() => {
    // 初始狀態
    if (timeData) {
      setDisplaySchedule(true);

      const arrExcludeTimes = [];
      // const selectableTime = [];

      timeDataConvert.forEach((existDate) => {
        if (existDate.getDate() === startDate.getDate()) {
          arrExcludeTimes.push(existDate);
        }
      });

      setExcludeTimes(arrExcludeTimes);
    }
  }, [timeData]);

  return (
    <StyleCalender>
      <StyleDatePickerContainer>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          onSelect={(date) => getExcludedTimes(date)}
          monthsShown
          inline
          showTimeSelect={true}
          minDate={new Date()}
          minTime={setHours(setMinutes(new Date(), 0), 9)}
          maxTime={setHours(setMinutes(new Date(), 0), 20)}
          timeIntervals={60}
          timeCaption="請選擇時段"
          dateFormat="yyyy/MM/dd"
          timeFormat="HH:mm"
          excludeTimes={excludeTimes}
          timeClassName={(date) => getAllTimes(date)}
        />
        <StyleDatePickerButton onClick={addDateToSchedule}>
          確認
        </StyleDatePickerButton>
      </StyleDatePickerContainer>
      <StyleAvailableTimeContainer>
        <StyleAvailableTimeTitle>我的可預約時段</StyleAvailableTimeTitle>
        {displaySchedule
          ? timeDataConvert.sort(compareAsc).map((date) => {
              return (
                <StyleEachAvailableTime key={date}>
                  <StyleAvailableTime id={date}>
                    {date.toLocaleString(navigator.language, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </StyleAvailableTime>
                  <StyleDeleteButton
                    onClick={deleteDateFromSchedule}></StyleDeleteButton>
                </StyleEachAvailableTime>
              );
            })
          : null}
      </StyleAvailableTimeContainer>
    </StyleCalender>
  );
};

export default TeacherCalendar;
