import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Resume from "./Resume/index";
import Video from "./Video";
import Swal from "sweetalert2";

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #7367f0;
`;

const StyleMainArea = styled.div`
  display: flex;

  @media only screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

const StyleLiveRoom = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-content: center;

  @media only screen and (max-width: 950px) {
    width: 100vw;
  }
`;

const StyleTitle = styled.div`
  width: 70vmin;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: auto auto 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #7367f0;

  @media only screen and (max-width: 1000px) {
    font-size: 2rem;
  }
`;

const StyleSubtitle = styled.div`
  width: 70vmin;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin: 0 auto;

  @media only screen and (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const StyleImage = styled.div`
  width: 70vmin;
  height: 40vmin;
  background-image: url(/images/theme/theme-5.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 45px auto auto;
  opacity: 0.9;

  :hover {
    transform: scale(1.03);
    transition: all 0.3s;
  }

  @media only screen and (max-width: 1000px) {
    /* width: 60vmin; */
    height: 40vmin;
  }
`;

const Live = () => {
  const identity = useSelector((state) => state.identity);
  const liveData = useSelector((state) => state.liveData); // 要視訊的對象
  const liveStatus = useSelector((state) => state.liveStatus); // 視訊室狀態
  console.log("視訊的對象:", liveData, "狀態:", liveStatus);

  return (
    <>
      <StyleHeaderArea />
      {liveStatus ? (
        <StyleMainArea>
          <Video />
          <Resume />
        </StyleMainArea>
      ) : (
        <StyleLiveRoom>
          <StyleTitle>
            {identity === "student"
              ? "No Live Invitation..."
              : "No Live Meeting..."}
          </StyleTitle>
          <StyleSubtitle>
            {identity === "student"
              ? "預約當日請留意畫面右上角小鈴鐺，查看是否有視訊通知！"
              : "預約當日請前往 Profile | My Class | Reservation 選擇視訊對象！"}
          </StyleSubtitle>
          <StyleImage />
        </StyleLiveRoom>
      )}
    </>
  );
};

export default Live;
