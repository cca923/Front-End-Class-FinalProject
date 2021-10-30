import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, compareAsc, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../css/calendar.css";

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
  background-image: url("./images/trash.png");

  &:hover {
    background-image: url("./images/trash-hover.gif");
  }
`;

const TeacherCalendar = (props) => {
  const identity = useSelector((state) => state.identity);
  const dispatch = useDispatch();
  console.log(identity);

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const [schedule, setSchedule] = useState([]);
  const timeList = document.querySelectorAll(
    ".react-datepicker__time-list-item"
  );

  // 初始狀態
  const getAllTimes = (daytime) => {
    schedule.forEach((existDate) => {
      if (existDate.getDate() === daytime.getDate()) {
        timeList.forEach((time) => {
          if (time.textContent === format(existDate, "HH:mm")) {
            // 同天
            time.classList.add("react-datepicker__time-list-item--disabled");
          }
        });
      } else {
        timeList.forEach((time) => {
          if (time.textContent === format(existDate, "HH:mm")) {
            // 不同天但時間相同
            // time.classList.remove("react-datepicker__time-list-item--disabled");
          }
        });
      }
    });
  };

  const addDateToSchedule = (e) => {
    if (startDate !== null) {
      const existDate = schedule.filter((existDate) => {
        if (existDate !== startDate) {
          return true;
        } else {
          return false;
        }
      });
      setSchedule([...existDate, startDate]);

      const target = Array.from(timeList).filter((time) => {
        if (time.textContent === format(startDate, "HH:mm")) {
          return true;
        } else {
          return false;
        }
      });
      target[0].classList.add("react-datepicker__time-list-item--disabled");
      target[0].classList.remove("react-datepicker__time-list-item--selected");
      window.alert("已成功加入可預約日曆中！");

      const selectableTime = Array.from(timeList).filter((time) => {
        if (
          time.classList.contains("react-datepicker__time-list-item--disabled")
        ) {
          return false;
        } else {
          return true;
        }
      });
      selectableTime[0].classList.add(
        "react-datepicker__time-list-item--selected"
      );
    }
  };

  const getExcludedTimes = (daytime) => {
    timeList.forEach((time) => {
      // 把 FirstSelectableTime 去掉
      time.classList.remove("react-datepicker__time-list-item--selected");

      schedule.forEach((existDate) => {
        if (existDate.getDate() === daytime.getDate()) {
          timeList.forEach((time) => {
            if (time.textContent === format(existDate, "HH:mm")) {
              // 同天
              time.classList.add("react-datepicker__time-list-item--disabled");
            }
          });
        } else {
          timeList.forEach((time) => {
            if (time.textContent === format(existDate, "HH:mm")) {
              // 不同天但時間相同
              time.classList.remove(
                "react-datepicker__time-list-item--disabled"
              );
            }
          });
        }
      });
    });
  };

  const getFirstSelectableTime = () => {
    timeList.forEach((time) => {
      time.classList.remove("react-datepicker__time-list-item--selected");
    });

    const selectableTime = Array.from(timeList).filter((time) => {
      if (
        time.classList.contains("react-datepicker__time-list-item--disabled")
      ) {
        return false;
      } else {
        return true;
      }
    });
    selectableTime[0].classList.add(
      "react-datepicker__time-list-item--selected"
    );
  };

  const returnSelectable = (date) => {
    timeList.forEach((time) => {
      if (time.textContent === format(date, "HH:mm")) {
        time.classList.remove("react-datepicker__time-list-item--disabled");
      }
    });

    getFirstSelectableTime();
  };

  const deleteDateFromSchedule = (e) => {
    const confirmDelete = window.confirm("確定要從日曆中移除嗎？");
    if (confirmDelete) {
      const deleteTargetDate = e.target.previousSibling.id;
      const existDate = schedule.filter((existDate) => {
        if (String(existDate) !== deleteTargetDate) {
          return true;
        } else {
          return false;
        }
      });
      // 從 state 中刪除
      setSchedule([...existDate]);
      // 再重新 fetch 一次
      returnSelectable(new Date(deleteTargetDate));
    }
  };

  return (
    <StyleCalender>
      <StyleDatePickerContainer>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            getExcludedTimes(date);
          }}
          onSelect={(date) => getFirstSelectableTime(date)}
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
          timeClassName={(date) => getAllTimes(date)} // initial state
        />
        <StyleDatePickerButton onClick={addDateToSchedule}>
          確認
        </StyleDatePickerButton>
      </StyleDatePickerContainer>
      <StyleAvailableTimeContainer>
        <StyleAvailableTimeTitle>我的可預約時段</StyleAvailableTimeTitle>
        {schedule !== null
          ? schedule.sort(compareAsc).map((date) => {
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
