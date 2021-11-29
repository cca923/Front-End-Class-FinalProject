import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { compareAsc } from "date-fns";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { removeData } from "../../../../../../utils/firebase";
import {
  handleScheduleSucceedAlert,
  handleConfirmedWithPopup,
} from "../../../../../../utils/swal";

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

const AvailableTime = ({ timeDataConvert }) => {
  const identityData = useSelector((state) => state.identityData);
  const timeData = identityData.time;

  const deleteDateFromSchedule = async (e) => {
    const deleteTargetDate = e.target.previousSibling.id; // GMT+800
    const deleteTargetValue = e.target.previousSibling.textContent;

    const removeTime = await handleConfirmedWithPopup(
      `移除時段｜${deleteTargetValue}`,
      "是否要從我的可預約時段中移除？",
      "Remove｜移除",
      "/images/theme/theme-6.png"
    );
    if (removeTime.isConfirmed) {
      const existDate = timeDataConvert.filter((existDate) => {
        return String(existDate) === deleteTargetDate;
      });

      await removeData(
        "teachers",
        identityData.email,
        "time",
        existDate[0].getTime()
      );

      await handleScheduleSucceedAlert(
        "移除成功！",
        `移除時段｜${deleteTargetValue}`
      );
    }
  };

  return (
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
  );
};

export default AvailableTime;
