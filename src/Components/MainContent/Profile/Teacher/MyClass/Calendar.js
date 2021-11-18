import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, compareAsc, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../css/calendar.css";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import firebase from "../../../../../utils/config/firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  line-height: 38px;
  margin: 0px auto 40px auto;
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

const StyleAvailableTimeContainer = styled.div`
  width: 30%;
  height: 455px;
  background-color: #757bc8;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1020px) {
    width: 100%;
    height: 250px;
  }
`;

const StyleAvailableTimeArea = styled.div`
  background-color: #757bc8;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
`;

const StyleAvailableTimeTitle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: #e4e5e1;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StyleEachAvailableTime = styled.div`
  background-color: #fff;
  width: 90%;
  padding: 10px;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
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

const StyleNoData = styled.div`
  background-color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 30px;
  color: #959595;
  width: 90%;
  padding: 10px;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
`;

const StyleCalenderIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  margin-right: 10px;
  cursor: pointer;
`;

const TeacherCalendar = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const timeData = identityData.time;
  const [timeDataConvert, setTimeDataConvert] = useState([]);
  // console.log("可以的沒過期的時間", timeDataConvert);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [selectedDate, setselectedDate] = useState(
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
    const selectedTargetValue = selectedDate.toLocaleString(
      navigator.language,
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    if (selectedDate) {
      Swal.fire({
        title: `加入時段｜${selectedTargetValue}`,
        html: `<h3>是否加入我的可預約時段中？</h3>`,
        confirmButtonText: "Yes｜加入",
        showLoaderOnConfirm: true,
        showCancelButton: true,
        cancelButtonText: "Cancel｜取消",
        customClass: {
          confirmButton: "confirm__button",
          cancelButton: "cancel__button",
        },
        imageUrl: "/images/theme/theme-11.png",
        imageWidth: 200,
        imageAlt: "theme image",
      }).then((result) => {
        if (result.isConfirmed) {
          teachersRef
            .update({
              time: firebase.firestore.FieldValue.arrayUnion(
                selectedDate.getTime()
                // selectedDate.valueOf() // 一樣
              ),
            })
            .then(() => {
              Swal.fire({
                title: "加入成功！",
                text: `新增時段｜${selectedTargetValue}`,
                icon: "success",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
              });
              // const timeList = document.querySelectorAll(
              //   ".react-datepicker__time-list-item"
              // );
              // const target = Array.from(timeList).filter(
              //   (time) => time.textContent === format(selectedDate, "HH:mm")
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
            });
        }
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
    const deleteTargetDate = e.target.previousSibling.id; // GMT+800
    const deleteTargetValue = e.target.previousSibling.textContent;

    Swal.fire({
      title: `移除時段｜${deleteTargetValue}`,
      html: `<h3>是否要從我的可預約時段中移除？</h3>`,
      confirmButtonText: "Remove｜移除",
      confirmButtonColor: "#ef233c",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      cancelButtonText: "Cancel｜取消",
      customClass: {
        confirmButton: "confirm__button",
        cancelButton: "cancel__button",
      },
      imageUrl: "/images/theme/theme-12.png",
      imageWidth: 200,
      imageAlt: "theme image",
    }).then((result) => {
      if (result.isConfirmed) {
        const existDate = timeDataConvert.filter((existDate) => {
          return String(existDate) === deleteTargetDate;
        });

        // 從 firestore 中刪除，會自動恢復成可以被選取的狀態
        teachersRef
          .update({
            time: firebase.firestore.FieldValue.arrayRemove(
              existDate[0].getTime()
            ),
          })
          .then(() => {
            Swal.fire({
              title: "移除成功！",
              text: `移除時段｜${deleteTargetValue}`,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  useEffect(() => {
    if (timeData) {
      // 日曆：過濾出要排除的時間
      const arrExcludeTimes = [];
      timeDataConvert.forEach((existDate) => {
        if (existDate.getDate() === selectedDate.getDate()) {
          arrExcludeTimes.push(existDate);
        }
      });

      setExcludeTimes(arrExcludeTimes);

      // 可預約：過濾出沒過期的時間
      const filtertime = timeData
        .map((data) => {
          return new Date(data);
        })
        .filter((data) => {
          return data > new Date();
        });
      setTimeDataConvert(filtertime);
    }
  }, [timeData]);

  return (
    <StyleCalender>
      <StyleDatePickerContainer>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setselectedDate(date);
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
        <StyleAvailableTimeTitle>
          <StyleCalenderIcon icon={faCalendarAlt} color="#484C7A" />
          我的可預約時段
        </StyleAvailableTimeTitle>
        <StyleAvailableTimeArea>
          {timeData ? (
            timeDataConvert.sort(compareAsc).map((date) => {
              return (
                <StyleEachAvailableTime key={nanoid()}>
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
          ) : (
            <StyleNoData>尚未提供可預約時段</StyleNoData>
          )}
        </StyleAvailableTimeArea>
      </StyleAvailableTimeContainer>
    </StyleCalender>
  );
};

export default TeacherCalendar;
