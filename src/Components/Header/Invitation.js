import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyleInvitation = styled.div`
  position: absolute;
  right: 25px;
  top: 55px;
  width: 300px;
  height: fit-content;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.9;
`;

const StyleRemove = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 8px;
  top: 8px;
  align-content: center;
  background-size: cover;
  background-position: center;
  background-image: url("/images/remove.png");
  cursor: pointer;

  &:hover {
    background-image: url("/images/remove-hover.png");
  }
`;

const StyleDetail = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1rem;
  font-size: 0.9rem;
  padding: 20px;
`;

const StyleTeacher = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #7678ed;
`;

const StyleName = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const StyleDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleInformation = styled.div`
  padding: 5px 0;
`;

const StyleRoomId = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const Invitation = (props) => {
  const invitationData = props.invitationData;
  console.log(invitationData);
  useEffect(() => {});

  return (
    <StyleInvitation>
      <StyleRemove
        onClick={() => {
          props.setDisplayInvitation(false);
        }}
      />
      <StyleDetail>
        <StyleTeacher>
          <StyleName>
            {invitationData.name} ({invitationData.email})
          </StyleName>
          <StyleInformation>正在邀請您！</StyleInformation>
        </StyleTeacher>
        <StyleDetailContainer>
          <StyleInformation>請開啟視訊鏡頭，輸入房間代碼</StyleInformation>
          <StyleRoomId>{invitationData.roomId}</StyleRoomId>
        </StyleDetailContainer>
      </StyleDetail>
    </StyleInvitation>
  );
};

export default Invitation;
