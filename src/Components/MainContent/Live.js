import React from "react";
import styled from "styled-components";

const Style = styled.div`
  width: 100%;
  height: 100px;
`;

const Live = (props) => {
  return (
    <div>
      <Style></Style>
      <h1>Live Room</h1>
      <div>
        <span>
          <h3>Local(Webcam)</h3>
          <video
            width="300"
            autoPlay
            playsInline
            ref={props.localVideo}></video>
        </span>
        <span>
          <h3>Remote</h3>
          <video
            width="300"
            autoPlay
            playsInline
            ref={props.remoteVideo}></video>
        </span>
      </div>

      <button onClick={props.openWebCam}>Start webcam</button>

      <h2>Create a new Call</h2>
      <button onClick={props.createOffer}>Call</button>

      <h2>Join a Call</h2>
      <input
        ref={props.callInput}
        // type="text"
        // onChange={(evt) => {
        //   console.log(evt.target.value);
        // }}
      />
      <button onClick={props.answerCall}>Answer</button>

      <button onClick={props.hangupCall}>Hangup</button>
    </div>
  );
};

export default Live;
