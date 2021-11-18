import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EasyEdit, { Types } from "react-easy-edit";
import "../../../../../../css/edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../../../../../utils/config/firebase-config";

const StyleCustomDisplay = styled.div`
  display: inline-block;
  word-wrap: break-word;
  max-width: 100%;
  resize: none;
  margin: 10px 0px;
  line-height: 1.3rem;
`;

const EditArea = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const resumeData = identityData.resume;

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const studentsRef = db.collection("students").doc(user.email);

  const [displayAbout, setDisplayAbout] = useState(false);

  const CustomDisplay = (props) => {
    if (displayAbout) {
      // 有資料呈現出來
      return (
        <StyleCustomDisplay ref={props.sendEdit}>
          {resumeData.about}
        </StyleCustomDisplay>
      );
    } else {
      // 沒有資料讓使用者輸入！
      const val = props.value || "點擊以編輯文字！";
      return (
        <StyleCustomDisplay ref={props.sendEdit}>{val}</StyleCustomDisplay>
      );
    }
  };

  useEffect(() => {
    // 初始狀態
    if (resumeData) {
      // 有 resume 且有 about 才呈現 true
      if (resumeData.about) {
        setDisplayAbout(true);
      }
    }
  }, [resumeData]);

  return displayAbout ? (
    <EasyEdit
      type={Types.TEXTAREA}
      value={resumeData.about} // initial state
      placeholder="請輸入文字"
      saveButtonLabel={<FontAwesomeIcon icon={faCheck} color="green" />}
      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} color="red" />}
      displayComponent={<CustomDisplay sendEdit={props.sendEdit} />}
      onSave={(value) => {
        const resume = {
          about: value,
        };
        studentsRef.set({ resume }, { merge: true }); // 已有 about
      }}
    />
  ) : (
    <EasyEdit
      type={Types.TEXTAREA}
      value={""} // initial state
      placeholder="請輸入文字"
      saveButtonLabel={<FontAwesomeIcon icon={faCheck} color="green" />}
      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} color="red" />}
      displayComponent={<CustomDisplay sendEdit={props.sendEdit} />}
      onSave={(value) => {
        const resume = {
          about: value,
        };
        studentsRef.set({ resume }, { merge: true }); // 沒有 about
      }}
    />
  );
};

export default EditArea;
