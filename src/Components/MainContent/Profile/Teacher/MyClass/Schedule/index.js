import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../../../css/calendar.css";

import Calendar from "./Calendar";
import AvailableTime from "./AvailableTime";

const StyleCalender = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;

  @media only screen and (max-width: 1020px) {
    flex-direction: column;
  }
`;

const TeacherSchedule = () => {
  const identityData = useSelector((state) => state.identityData);
  const timeData = identityData.time;
  const reservationTimeData = identityData.reservation;

  const [timeDataConvert, setTimeDataConvert] = useState([]);
  const [reservationTimeDataConvert, setReservationTimeDataConvert] = useState(
    []
  );
  const [excludeTimes, setExcludeTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    setHours(setMinutes(new Date(), 0), 0)
  );

  useEffect(() => {
    const arrExcludeTimes = [];

    if (timeData) {
      // Calendar should excludes available time
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
      // Calendar should excludes reservation time
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
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        timeDataConvert={timeDataConvert}
        reservationTimeDataConvert={reservationTimeDataConvert}
        excludeTimes={excludeTimes}
        setExcludeTimes={setExcludeTimes}
      />
      <AvailableTime timeDataConvert={timeDataConvert} />
    </StyleCalender>
  );
};

export default TeacherSchedule;
