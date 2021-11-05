import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import firebase from "../../utils/config/firebase-config";
import videoOn from "../../images/video-on.png";
import videoOff from "../../images/video-off.png";
import exit from "../../images/exit.png";
import phoneOn from "../../images/microphone-on.png";
import phoneOff from "../../images/microphone-off.png";

const Style = styled.div`
  width: 100%;
  height: 100px;
`;

const StyleHeaderArea = styled.div`
  /* opacity: 0.8; */
  width: 100%;
  height: 100px;
  background-color: #c4bccf;
  /* background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: -130% 0;
  display: inline-block;
  vertical-align: bottom;
  background-image: url("/images/home-teacher.png");

  @media only screen and (max-width: 1020px) {
    height: 200px;
  } */
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
  /* width: 353px; */
  height: 300px;
  /* height: fit-content; */
  background-color: black;
  border-radius: 0 0 20px 20px;
`;

const StyleLocalArea = styled.div`
  width: 330px;
  margin: 20px;
`;

const StyleRemoteArea = styled.div`
  width: 330px;
  margin: 20px;
`;

const StyleName = styled.div`
  padding: 8px;
  text-align: center;
  background-color: #fff;
  font-size: 1.5rem;
  font-weight: 800;
  vertical-align: middle;
  /* line-height: 24px; */
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

const StyleMicrophone = styled.img`
  margin: auto;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => (props.video ? "#8fb996" : "#c0c0c0")};

  &:hover {
    background-color: ${(props) => (props.video ? "red" : "#8fb996")};
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

const StyleRoomIdButton = styled.div`
  width: 120px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border-radius: 10px 0 0 10px;
  border: 2px solid #bbadff;
  padding: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const StyleRoomId = styled.div`
  width: 210px;
  font-size: 1rem;
  border-radius: 0 10px 10px 0;
  border: 2px solid #c5c5c5;
  border-left: none;
  padding: 10px;
  text-align: center;
`;

const StyleInvitationArea = styled.div`
  display: flex;
`;

const StyleInput = styled.input`
  width: 210px;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 10px 0 0 10px;
  border: 2px solid #c5c5c5;
  border-right: none;
  padding-left: 10px;
`;

const StyleInvitationButton = styled.div`
  width: 120px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border-radius: 0 10px 10px 0;
  border: 2px solid #bbadff;
  padding: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const Live = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const identity = useSelector((state) => state.identity);

  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const [webCam, setWebCam] = useState(false);
  const [microphone, setMicroPhone] = useState(false);
  const [createRoomId, setcreateRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [studentName, setStudentName] = useState("");

  // const [roomId, setRoomId] = useState("");

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
  const createId = useRef();
  const joinRoom = useRef();
  const studentEmail = useRef();

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
  };

  const createOffer = async () => {
    const callDoc = db.collection("calls").doc(); // create id
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // 老師產生的房間代碼，儲存起來要寄給學生
    // setcreateRoomId(callDoc.id); //BUG
    createId.current.textContent = callDoc.id;
    console.log(createId.current.textContent);

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const answerCall = async () => {
    // 學生收到通知複製貼上的房間代碼，依照 id 進入房間
    // const callDoc = db.collection("calls").doc(joinRoomId); //BUG
    const callId = joinRoom.current.value;
    const callDoc = db.collection("calls").doc(callId);
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const hangupCall = () => {
    // const stream = videoElem.srcObject;
    // const tracks = stream.getTracks();
    // localVideo.current.srcObject.getTracks().forEach(function (track) {
    //   track.stop();
    // });
    // pc.close();
    // remoteVideo.current.srcObject.getTracks().forEach(function (track) {
    //   track.stop();
    // });
    // localVideo.current.srcObject = null;
    // remoteVideo.current.srcObject = null;
  };

  const handleInvitation = () => {
    const email = studentEmail.current.value;
    console.log(email);
    const invitation = {
      email: identityData.email,
      name: identityData.name,
      roomId: createId.current.textContent,
    };
    // 加入 firebase 學生邀請
    studentsCollection.doc(email).update({ invitation });
  };

  return (
    <div>
      <StyleHeaderArea />

      <StyleLocalArea>
        <StyleName>{identityData.name}</StyleName>
        <StyleVideoContainer>
          <StyleVideoSize>
            <StyleVideoArea autoPlay playsInline ref={localVideo} />
          </StyleVideoSize>

          <StyleToggleArea>
            <StyleToggle>
              <StyleLabel>開啟視訊</StyleLabel>
              <StyleOpenWebCam src={videoOn} onClick={openWebCam} />
            </StyleToggle>
            <StyleToggle>
              <StyleLabel>離開房間</StyleLabel>
              <StyleExit src={exit} />
            </StyleToggle>
            {/* <div>
              <StyleMicrophone src={microphone ? phoneOff : phoneOn} />
              <StyleLabel>
                {microphone ? "關掉麥克風" : "開啟麥克風"}
              </StyleLabel>
            </div> */}
          </StyleToggleArea>
        </StyleVideoContainer>

        {identity === "teacher" ? (
          <StyleCalloutArea>
            <StyleCreateRoomIdArea>
              <StyleRoomIdButton onClick={createOffer}>
                產生房間代碼
              </StyleRoomIdButton>
              <StyleRoomId ref={createId}></StyleRoomId>
            </StyleCreateRoomIdArea>
            <StyleInvitationArea>
              <StyleInput
                ref={studentEmail}
                type="text"
                placeholder="請輸入對方的 Email"
              />
              <StyleInvitationButton
                onClick={() => {
                  handleInvitation();
                }}>
                寄送通知
              </StyleInvitationButton>
            </StyleInvitationArea>
          </StyleCalloutArea>
        ) : (
          <StyleInvitationArea>
            <StyleInput ref={joinRoom} placeholder="請輸入房間代碼" />
            <StyleInvitationButton onClick={answerCall}>
              加入房間
            </StyleInvitationButton>
          </StyleInvitationArea>
        )}
      </StyleLocalArea>

      <StyleRemoteArea>
        <StyleName>{studentName}</StyleName>
        <StyleVideoSize>
          <StyleVideoArea autoPlay playsInline ref={remoteVideo} />
        </StyleVideoSize>
      </StyleRemoteArea>

      {/* <button onClick={openWebCam}>Start webcam</button>

      <h2>Create a new Call</h2>
      <button onClick={createOffer}>Call</button>

      <h2>Join a Call</h2>
      <input
        ref={createId}
        // type="text"
        // onChange={(evt) => {
        //   console.log(evt.target.value);
        // }}
      />
      <button onClick={answerCall}>Answer</button>

      <button onClick={hangupCall}>Hangup</button> */}
    </div>
  );
};

export default Live;
