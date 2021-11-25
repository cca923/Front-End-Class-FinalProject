import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, compareAsc } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../css/calendar.css";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import firebase from "../../../../../utils/firebase";
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
  height: 500px;
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

const StyleAvailableTime = styled.div`
  line-height: 30px;
  font-size: 1.1rem;
  margin-right: auto;
`;

const StyleDeleteButton = styled.div`
  width: 30px;
  height: 30px;
  visibility: hidden;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-image: url("/images/trash.png");

  &:hover {
    background-image: url("/images/trash-hover.gif");
  }
`;

const StyleEachAvailableTime = styled.div`
  background-color: #fff;
  width: 90%;
  padding: 10px;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;
  cursor: pointer;

  :hover ${StyleDeleteButton} {
    visibility: visible;
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
  const reservationTimeData = identityData.reservation;
  const [timeDataConvert, setTimeDataConvert] = useState([]);
  // console.log("日曆ban掉還可被預約的沒過期時間", timeDataConvert);
  const [reservationTimeDataConvert, setReservationTimeDataConvert] = useState(
    []
  );
  // console.log("日曆ban掉被預約過的沒過期時間", reservationTimeDataConvert);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const teachersRef = db.collection("teachers").doc(user.email);

  const [selectedDate, setSelectedDate] = useState(
    setHours(setMinutes(new Date(), 0), 0)
  );
  const [excludeTimes, setExcludeTimes] = useState([]);
  // console.log(excludeTimes);

  const removeSelectableTime = (time) => {
    const timeList = document.querySelectorAll(
      ".react-datepicker__time-list-item"
    );
    Array.from(timeList).forEach((alldate) => {
      alldate.classList.remove("react-datepicker__time-list-item--selected");
    });
  };

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

    if (selectedDate.getHours() === 0) {
      Swal.fire({
        title: "請選擇加入的時段",
        icon: "warning",
        showCloseButton: true,
        customClass: {
          confirmButton: "confirm__button",
        },
      });
    } else {
      Swal.fire({
        title: `加入時段｜${selectedTargetValue}`,
        html: `<h3>是否加入我的可預約時段中？</h3>`,
        confirmButtonText: "Yes｜加入",
        showCancelButton: true,
        cancelButtonText: "Cancel｜取消",
        customClass: {
          confirmButton: "confirm__button",
          cancelButton: "cancel__button",
        },
        imageUrl: "/images/theme/theme-11.png",
        imageWidth: 130,
        imageAlt: "theme image",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return teachersRef.update({
              time: firebase.firestore.FieldValue.arrayUnion(
                selectedDate.getTime()
                // selectedDate.valueOf() // 一樣
              ),
            });
          }
        })
        .then(() => {
          Swal.fire({
            title: "加入成功！",
            text: `新增時段｜${selectedTargetValue}`,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            removeSelectableTime();
          });
        });
    }
  };

  // 依照 time(available) & reservation.time(reserved) 判斷要從日曆上排除的時間
  const getExcludedTimes = (daytime) => {
    const arrExcludeTimes = [];

    timeDataConvert.forEach((existDate) => {
      // 先確認月份再確認日期
      if (existDate.getMonth() === daytime.getMonth()) {
        if (existDate.getDate() === daytime.getDate()) {
          arrExcludeTimes.push(existDate);
        }
      }

      reservationTimeDataConvert.forEach((existDate) => {
        if (existDate.getMonth() === selectedDate.getMonth()) {
          if (existDate.getDate() === selectedDate.getDate()) {
            arrExcludeTimes.push(existDate);
          }
        }
      });

      // console.log(
      //   "依照 time(available) & reservation.time(reserved) 判斷要從日曆上排除的時間",
      //   arrExcludeTimes
      // );

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
      imageWidth: 130,
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

  // 日曆上過濾過期的時間
  const filterPassedTime = (time) => {
    // getFirstSelectableTime(time);

    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    // 日曆：過濾出要排除的時間(選了的：可預約、已預約都要被排除)
    const arrExcludeTimes = [];

    if (timeData) {
      // 可預約：過濾出沒過期的時間
      const filtertime = timeData
        .map((data) => {
          return new Date(data);
        })
        .filter((data) => {
          return data > new Date();
        });

      setTimeDataConvert(filtertime);

      filtertime.forEach((existDate) => {
        if (existDate.getMonth() === selectedDate.getMonth()) {
          if (existDate.getDate() === selectedDate.getDate()) {
            arrExcludeTimes.push(existDate);
          }
        }
      });
    }

    if (reservationTimeData) {
      // 已被預約了所以也要被日曆 ban 掉：過濾預約了且沒過期的時間
      const filterReservationTime = reservationTimeData
        .map((eachReservation) => {
          return new Date(eachReservation.time);
        })
        .filter((time) => {
          return time > new Date();
        });

      setReservationTimeDataConvert(filterReservationTime);

      filterReservationTime.forEach((existDate) => {
        if (existDate.getMonth() === selectedDate.getMonth()) {
          if (existDate.getDate() === selectedDate.getDate()) {
            arrExcludeTimes.push(existDate);
          }
        }
      });
    }

    setExcludeTimes(arrExcludeTimes);
  }, [timeData, selectedDate]);

  return (
    <StyleCalender>
      <StyleDatePickerContainer>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          onSelect={(date) => {
            // 日期更改
            getExcludedTimes(date);
            setSelectedDate(setHours(setMinutes(new Date(date), 0), 0));
          }}
          onMonthChange={(date) => {
            // 月份更改
            getExcludedTimes(date);
            setSelectedDate(setHours(setMinutes(new Date(date), 0), 0));
          }}
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
          filterTime={filterPassedTime}
          timeClassName={(time) =>
            time.getHours() === 0 ? "hidden_time" : undefined
          }
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
            <>
              {timeDataConvert.length !== 0 ? (
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
            </>
          ) : (
            <StyleNoData>尚未提供可預約時段</StyleNoData>
          )}
        </StyleAvailableTimeArea>
      </StyleAvailableTimeContainer>
    </StyleCalender>
  );
};

export default TeacherCalendar;
