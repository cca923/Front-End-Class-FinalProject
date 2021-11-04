import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "./utils/config/firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { checkSignStatus } from "./Redux/Action";
import Sign from "./Components/MainContent/Sign/Sign";
import Home from "./Components/MainContent/Home";
import Live from "./Components/MainContent/Live";
import Header from "./Components/Header/Header";
import Profile from "./Components/MainContent/Profile";
import Teachers from "./Components/MainContent/Teachers";
import EachTeacher from "./Components/MainContent/Teachers/EachTeacher/index";

function App() {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

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
  const callInput = useRef();

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

    callInput.current.value = callDoc.id;

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
    const callId = callInput.current.value;
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

    localVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });

    pc.close();

    remoteVideo.current.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });

    localVideo.current.srcObject = null;
    remoteVideo.current.srcObject = null;
  };

  const signPage = useSelector((state) => state.signPage);

  return (
    <>
      <Header />
      {signPage ? <Sign /> : null}

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {user ? (
          <>
            <Route path="/teachers" exact>
              <Teachers />
            </Route>
            <Route path="/teachers/:teacherUid" exact>
              <EachTeacher />
            </Route>
            <Route path="/live">
              <Live
                openWebCam={openWebCam}
                createOffer={createOffer}
                answerCall={answerCall}
                hangupCall={hangupCall}
                localVideo={localVideo}
                remoteVideo={remoteVideo}
                callInput={callInput}
              />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </>
        ) : null}
      </Switch>
    </>
  );
}

export default App;
