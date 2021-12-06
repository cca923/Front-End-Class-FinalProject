import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EasyEdit, { Types } from "react-easy-edit";
import "../../../../../../css/edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { updateStudentData } from "../../../../../../utils/firebase";

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

  const CustomDisplay = (props) => {
    if (resumeData?.about) {
      return (
        <StyleCustomDisplay ref={props.sendEdit}>
          {resumeData.about}
        </StyleCustomDisplay>
      );
    } else {
      const val = props.value || "點擊以編輯文字！";
      return (
        <StyleCustomDisplay ref={props.sendEdit}>{val}</StyleCustomDisplay>
      );
    }
  };

  return (
    <EasyEdit
      type={Types.TEXTAREA}
      value={resumeData?.about || ""}
      placeholder="請輸入文字"
      saveButtonLabel={<FontAwesomeIcon icon={faCheck} color="green" />}
      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} color="red" />}
      displayComponent={<CustomDisplay sendEdit={props.sendEdit} />}
      onSave={(value) => {
        updateStudentData(identityData.email, {
          resume: { ...identityData.resume, about: value },
        });
      }}
    />
  );
};

export default EditArea;
