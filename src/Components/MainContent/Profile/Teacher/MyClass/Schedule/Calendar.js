import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../../css/calendar.css";

import { addData } from "../../../../../../utils/firebase";
import {
  handleConfirmedWithPopup,
  handleScheduleSucceedAlert,
  warningAlert,
} from "../../../../../../utils/swal";
import { StyleWhiteButton } from "../../../../../Common/button";

const StyleDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media only screen and (max-width: 1020px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const StyleDatePickerButton = styled(StyleWhiteButton)`
  margin: 0px auto 40px;
`;

export const getExcludedTimes = (
  date,
  timeDataConvert,
  reservationTimeDataConvert
) => {
  const arrExcludeTimes = [];

  // Calendar should excludes available time
  timeDataConvert.forEach((existDate) => {
    if (existDate.getMonth() === date.getMonth()) {
      if (existDate.getDate() === date.getDate()) {
        arrExcludeTimes.push(existDate);
      }
    }
  });

  // Calendar should excludes reservation time
  reservationTimeDataConvert.forEach((existDate) => {
    if (existDate.getMonth() === date.getMonth()) {
      if (existDate.getDate() === date.getDate()) {
        arrExcludeTimes.push(existDate);
      }
    }
  });

  return arrExcludeTimes;
};

const Calendar = ({
  selectedDate,
  setSelectedDate,
  timeDataConvert,
  reservationTimeDataConvert,
  excludeTimes,
  setExcludeTimes,
}) => {
  const identityData = useSelector((state) => state.identityData);

  const addTimeToSchedule = async () => {
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
      await warningAlert("請選擇加入的時段");
    } else {
      const addTime = await handleConfirmedWithPopup(
        `加入時段｜${selectedTargetValue}`,
        "是否加入我的可預約時段中？",
        "Yes｜加入",
        "/images/theme/theme-5.png"
      );
      if (addTime.isConfirmed) {
        await addData(
          "teachers",
          identityData.email,
          "time",
          selectedDate.getTime()
        );
        await handleScheduleSucceedAlert(
          "加入成功！",
          `新增時段｜${selectedTargetValue}`
        );

        setSelectedDate(setHours(setMinutes(new Date(selectedDate), 0), 0));
      }
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <StyleDatePickerContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        onSelect={(date) => {
          // Day Change
          const timeToExclude = getExcludedTimes(
            date,
            timeDataConvert,
            reservationTimeDataConvert
          );
          setExcludeTimes(timeToExclude);

          setSelectedDate(setHours(setMinutes(new Date(date), 0), 0));
        }}
        onMonthChange={(date) => {
          // Month Change
          const timeToExclude = getExcludedTimes(
            date,
            timeDataConvert,
            reservationTimeDataConvert
          );
          setExcludeTimes(timeToExclude);

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
      <StyleDatePickerButton onClick={addTimeToSchedule}>
        確認
      </StyleDatePickerButton>
    </StyleDatePickerContainer>
  );
};

export default Calendar;
