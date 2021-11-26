import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import editIcon from "../../../../images/edit.png";
import editIconHover from "../../../../images/edit-hover.png";
import saveIcon from "../../../../images/save.png";
import saveIconHover from "../../../../images/save-hover.png";
import { studentData, updateStudentData } from "../../../../utils/firebase";
import { formats, modules } from "../../../../utils/quillEditor";
import { StyleEditResumeButton } from "../../../Common/button";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  position: relative;
`;

const StyleReactQuill = styled(ReactQuill)`
  width: 100%;
  z-index: 50;
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 50;
  line-height: 1.6rem;
  padding: 10px;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }
`;

const StyleEditButton = styled(StyleEditResumeButton)`
  display: ${(props) => (props.hover ? "inline-block" : "none")};
`;

const Editor = ({ hover }) => {
  const liveData = useSelector((state) => state.liveData);
  const resumeData = liveData.resume;
  const [value, setValue] = useState();
  const [onHover, setOnHover] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (resumeData && resumeData?.detail) {
      studentData(liveData.email).then((doc) => {
        setValue(doc.data().resume.detail);
      });
    } else {
      setValue("該用戶尚未編輯過履歷");
    }
  }, [resumeData, resumeData?.detail]);

  return (
    <StyleEditorArea>
      {edit ? (
        <StyleReactQuill
          value={value}
          onChange={(value) => {
            setValue(value);
            updateStudentData(liveData.email, {
              resume: { ...liveData.resume, detail: value },
            });
          }}
          modules={modules}
          formats={formats}
        />
      ) : (
        <StyleReactQuillDisplay>
          {ReactHtmlParser(value)}
        </StyleReactQuillDisplay>
      )}

      <StyleEditButton
        hover={hover}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        src={
          edit
            ? onHover
              ? saveIconHover
              : saveIcon
            : onHover
            ? editIconHover
            : editIcon
        }
        onClick={() => {
          edit ? setEdit(false) : setEdit(true);
        }}
      />
    </StyleEditorArea>
  );
};

export default Editor;
