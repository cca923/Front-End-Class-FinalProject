import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  getLiveData,
  getLiveStatus,
  startRunGuide,
} from "../../../../../../../Redux/Action";
import { fetchStudentData } from "../../../../../../../utils/firebase";
import { handleConfirmedWithPopup } from "../../../../../../../utils/swal";
import {
  StylePurpleButton,
  StyleWhiteButton,
} from "../../../../../../Common/button";

import noPhoto from "../../../../../../../images/no-photo-square.png";

import Resume from "./Resume";

const StyleEachStudent = styled.div`
  width: 100%;
  height: 290px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;

  @media only screen and (max-width: 1020px) {
    height: 120px;
    flex-direction: row;
  }

  @media only screen and (max-width: 720px) {
    height: 270px;
    flex-direction: column;
  }
`;

const StyleOrderNumber = styled.div`
  position: absolute;
  right: 10px;
  font-size: 10px;
  color: grey;
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: #e1e1e1;
  object-fit: cover;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 10px;

  @media only screen and (max-width: 1020px) {
    width: calc(100% - 100px);
    padding: 17px 10px 0 20px;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
    padding: 17px 10px 0 10px;
  }
`;

const StyleEachDetail = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyleLabel = styled.div`
  width: 50px;
  border-right: 1px solid #7367f0;
  margin-right: 10px;
`;

const StyleData = styled.span``;

const StyleResume = styled(StyleWhiteButton)`
  position: absolute;
  right: 20px;
  bottom: 0px;
  width: 100px;
  margin: 0 auto 20px;
`;

const StyleLive = styled(StylePurpleButton)`
  position: absolute;
  right: 130px;
  bottom: 0px;
  width: 100px;
  margin: 0 auto 20px auto;
`;

const EachReservation = ({ eachReservation }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [eachStudentData, setEachStudentData] = useState([]);
  const [displayResume, setDisplayResume] = useState(false);

  useEffect(() => {
    fetchStudentData(eachReservation.email).then((doc) => {
      setEachStudentData(doc.data());
    });
  }, []);

  const time = new Date(eachReservation.time).toLocaleString(
    navigator.language,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <StyleEachStudent>
      <StyleOrderNumber>
        預定編號：
        <span>{eachReservation.time}</span>
      </StyleOrderNumber>
      <StyleImage
        alt={eachStudentData.name}
        src={eachStudentData.photo || noPhoto}
      />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{eachStudentData.name}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>Email </StyleLabel>
          <StyleData>{eachReservation.email}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>日期</StyleLabel>
          <StyleData>{time}</StyleData>
        </StyleEachDetail>

        {new Date(eachReservation.time) > new Date() ? (
          <StyleLive
            onClick={async () => {
              const goLive = await handleConfirmedWithPopup(
                `預約時間｜${time}`,
                `預約姓名｜${eachStudentData.name}`,
                "Go｜前往",
                "/images/theme/theme-1.png"
              );
              if (goLive.isConfirmed) {
                dispatch(getLiveData(eachStudentData));
                dispatch(getLiveStatus(true));
                history.push("/live");
                dispatch(startRunGuide(true));
              }
            }}>
            前往視訊
          </StyleLive>
        ) : null}

        <StyleResume
          onClick={() => {
            setDisplayResume(true);
          }}>
          他的履歷
        </StyleResume>
        {displayResume ? (
          <Resume
            setDisplayResume={setDisplayResume}
            eachStudentData={eachStudentData}
          />
        ) : null}
      </StyleDetail>
    </StyleEachStudent>
  );
};

export default EachReservation;
