import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Joyride, { STATUS } from "react-joyride";

import {
  getLiveData,
  getLiveStatus,
  startRunGuide,
} from "../../../Redux/Action";
import {
  addData,
  answerCall,
  createOffer,
  deleteInvitation,
  updateStudentData,
} from "../../../utils/firebase";
import {
  deleteInvitationWarningAlert,
  commentWithPopup,
  successAlert,
  sendInvitationSucceedAlert,
} from "../../../utils/swal";
import { studentSteps, teacherSteps } from "../../../utils/joyrideSteps";
import { StyleWhiteButton } from "../../Common/button";

import videoOn from "../../../images/video-on.png";
import exit from "../../../images/exit.png";

import Tooltip from "./Tooltip";

const StyleVideo = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);

  @media only screen and (max-width: 950px) {
    flex-direction: row;
    height: fit-content;
  }

  @media only screen and (max-width: 730px) {
    flex-direction: column;
  }
`;

const StyleVideoContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const StyleVideoSize = styled.div`
  height: 200px;
  width: 100%;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
`;

const StyleVideoArea = styled.video`
  height: 300px;
  background-color: black;
  border-radius: 0 0 20px 20px;
`;

const StyleLocalArea = styled.div`
  width: 330px;
  margin: 20px;

  @media only screen and (max-width: 730px) {
    margin: 20px auto;
  }
`;

const StyleRemoteArea = styled.div`
  width: 330px;
  margin: auto 20px 20px 20px;

  @media only screen and (max-width: 950px) {
    margin: 20px 20px 20px auto;
  }

  @media only screen and (max-width: 730px) {
    margin: 20px auto;
  }
`;

const StyleName = styled.div`
  padding: 8px;
  text-align: center;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  vertical-align: middle;
  height: 40px;
  border-radius: 20px 20px 0 0;
`;

const StyleToggleArea = styled.div`
  display: flex;
  position: absolute;
  bottom: 11px;
  padding-left: 7px;
`;

const StyleToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 3px;
`;

const StyleOpenWebCam = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#595959")};
  border: ${(props) =>
    props.video ? "2px solid #8fb996" : "2px solid #c3c3c3"};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#c3c3c3")};
    border: ${(props) => (props.video ? "2px solid red" : "2px solid #595959")};
  }
`;

const StyleExit = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#595959")};
  border: ${(props) =>
    props.video ? "2px solid #8fb996" : "2px solid #c3c3c3"};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#c3c3c3")};
    border: ${(props) => (props.video ? "2px solid red" : "2px solid #595959")};
  }
`;

const StyleLabel = styled.div`
  font-size: 10px;
  color: #fff;
  padding-bottom: 5px;
`;

const StyleCalloutArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StyleCreateRoomIdArea = styled.div`
  display: flex;
`;

const StyleConfirmButton = styled(StyleWhiteButton)`
  width: 120px;
  margin: 0 auto 10px auto;
`;

const StyleRoomId = styled.div`
  width: 100%;
  font-size: 1rem;
  border: 2px solid #c5c5c5;
  border-radius: 50px;
  text-align: center;
  visibility: hidden;
`;

const StyleInvitationArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Video = () => {
  const identityData = useSelector((state) => state.identityData);
  const identity = useSelector((state) => state.identity);
  const liveData = useSelector((state) => state.liveData);
  const runGuide = useSelector((state) => state.runGuide);
  const history = useHistory();
  const dispatch = useDispatch();

  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  // Global state
  let pc = new RTCPeerConnection(servers);
  let localStream = null;
  let remoteStream = null;

  // Control element via Dom
  const localVideo = useRef();
  const remoteVideo = useRef();
  const roomIdRef = useRef();
  const joinRoomRef = useRef();

  // 開啟視訊，若是老師將同時產生房間代碼
  const openWebCam = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Show stream in HTML video
    localVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = remoteStream;

    if (identity === "teacher") {
      createOffer(pc, roomIdRef);
    }
  };

  const hangupCall = async () => {
    const closeStream = () => {
      localVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });
      remoteVideo.current.srcObject.getTracks().forEach(function (track) {
        track.stop();
      });

      localVideo.current.srcObject = null;
      remoteVideo.current.srcObject = null;

      pc.ontrack = null;
      pc.onicecandidate = null;
      pc.close();
      pc = null;
    };

    if (identity === "teacher") {
      if (!localVideo.current.srcObject?.active) {
        // 沒開鏡頭時...
        history.push("/profile/myclass");
        dispatch(getLiveData(null));
        dispatch(getLiveStatus(false));
      } else {
        // 有開鏡頭時...
        closeStream();
        history.push("/profile/myclass");
        dispatch(getLiveData(null));
        dispatch(getLiveStatus(false));
      }
    } else if (identity === "student") {
      if (!localVideo.current.srcObject?.active) {
        // 沒開鏡頭時...
        const leaveLive = await deleteInvitationWarningAlert(
          identityData.invitation.name
        );
        if (leaveLive.isConfirmed) {
          history.push("/");
          dispatch(getLiveStatus(false));
          await deleteInvitation("students", identityData.email, "invitation");
        }
      } else {
        // 有開鏡頭時...
        const addComment = await commentWithPopup(identityData.invitation.name);
        if (addComment.isDenied) {
          closeStream();
          history.push("/");
          dispatch(getLiveStatus(false));
          await deleteInvitation("students", identityData.email, "invitation");
        } else if (addComment.isConfirmed) {
          closeStream();
          const comments = {
            email: identityData.email,
            comment: addComment.value,
            time: new Date().getTime(),
          };

          await addData(
            "teachers",
            identityData.invitation.email,
            "comments",
            comments
          );
          await successAlert("評論成功，自動跳轉至首頁");
          history.push("/");
          dispatch(getLiveStatus(false));
          await deleteInvitation("students", identityData.email, "invitation");
        }
      }
    }
  };

  const handleInvitation = async () => {
    const invitation = {
      email: identityData.email,
      name: identityData.name,
      roomId: roomIdRef.current.textContent,
    };
    await updateStudentData(liveData.email, { invitation });
    await sendInvitationSucceedAlert(liveData.name);
  };

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      dispatch(startRunGuide(false));
    }

    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  };

  return (
    <>
      {identity === "teacher" ? (
        <Joyride
          callback={handleJoyrideCallback}
          continuous={true}
          run={runGuide}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={teacherSteps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
          tooltipComponent={Tooltip}
        />
      ) : (
        <Joyride
          callback={handleJoyrideCallback}
          continuous={true}
          run={runGuide}
          scrollToFirstStep={true}
          showProgress={true}
          showSkipButton={true}
          steps={studentSteps}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
          tooltipComponent={Tooltip}
        />
      )}

      <StyleVideo>
        <StyleLocalArea>
          <StyleName>{identityData.name}</StyleName>
          <StyleVideoContainer>
            <StyleVideoSize>
              <StyleVideoArea autoPlay playsInline ref={localVideo} />
            </StyleVideoSize>

            <StyleToggleArea>
              <StyleToggle className="open_webcam">
                <StyleLabel>開啟視訊</StyleLabel>
                <StyleOpenWebCam src={videoOn} onClick={openWebCam} />
              </StyleToggle>
              <StyleToggle className="exit_live">
                <StyleLabel>離開房間</StyleLabel>
                <StyleExit src={exit} onClick={hangupCall} />
              </StyleToggle>
            </StyleToggleArea>
          </StyleVideoContainer>

          {identity === "teacher" ? (
            <StyleCalloutArea>
              <StyleInvitationArea>
                <StyleConfirmButton
                  className="send_invitation"
                  onClick={() => {
                    handleInvitation();
                  }}>
                  寄送通知
                </StyleConfirmButton>
              </StyleInvitationArea>
              <StyleCreateRoomIdArea>
                <StyleRoomId ref={roomIdRef} />
              </StyleCreateRoomIdArea>
            </StyleCalloutArea>
          ) : (
            <StyleInvitationArea>
              <StyleConfirmButton
                className="join_invitation"
                onClick={() => {
                  answerCall(pc, joinRoomRef);
                }}>
                加入房間
              </StyleConfirmButton>
              <StyleRoomId ref={joinRoomRef}>
                {identityData.invitation
                  ? identityData.invitation.roomId
                  : null}
              </StyleRoomId>
            </StyleInvitationArea>
          )}
        </StyleLocalArea>

        <StyleRemoteArea>
          <StyleName>
            {identity === "teacher"
              ? liveData.name
              : identityData.invitation.name}
          </StyleName>
          <StyleVideoSize>
            <StyleVideoArea autoPlay playsInline ref={remoteVideo} />
          </StyleVideoSize>
        </StyleRemoteArea>
      </StyleVideo>
    </>
  );
};

export default Video;
