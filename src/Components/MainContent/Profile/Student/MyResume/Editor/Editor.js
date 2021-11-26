import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import editIcon from "../../../../../../images/edit.png";
import editIconHover from "../../../../../../images/edit-hover.png";
import saveIcon from "../../../../../../images/save.png";
import saveIconHover from "../../../../../../images/save-hover.png";
import { updateStudentData } from "../../../../../../utils/firebase";
import { formats, modules } from "../../../../../../utils/quillEditor";
import { StyleEditResumeButton } from "../../../../../Common/button";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  position: relative;
`;

const StyleReactQuill = styled(ReactQuill)`
  width: 100%;
  z-index: 1000;
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  line-height: 1.6rem;
  padding: 10px 30px;

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
  const identityData = useSelector((state) => state.identityData);
  const resumeData = identityData.resume;

  const [value, setValue] = useState(); // 設定初始值，是 detail 還是 firebase 資料
  const [edit, setEdit] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);

  const detail = `
    <h1>Work Experience</h1>
    <h1>Education</h1>
    <h1>Skill</h1>
  `;

  useEffect(() => {
    if (!resumeData) {
      setValue(detail);
    } else if (resumeData && !resumeData.detail) {
      // 沒有過 Detail 會立刻幫他補上，就瞬間 update 成有過 Detail
      updateStudentData(identityData.email, {
        resume: { ...identityData.resume, detail },
      }).then(() => {
        setValue(detail);
        setDisplayDetail(true);
      });
    } else if (resumeData && resumeData.detail) {
      // 有過 Detail
      setValue(resumeData.detail);
      setDisplayDetail(true);
    }
  }, [resumeData]);

  return (
    <StyleEditorArea>
      {edit ? (
        // 依照 firebase 是否有 resume.detail 來判斷
        displayDetail ? (
          <StyleReactQuill
            placeholder="開始編輯履歷吧！"
            value={value} // value = firebase data
            onChange={(value) => setValue(value)}
            modules={modules}
            formats={formats}
          />
        ) : (
          <StyleReactQuill
            placeholder="開始編輯履歷吧！"
            value={value} // value = detail
            onChange={(value) => setValue(value)}
            modules={modules}
            formats={formats}
          />
        )
      ) : displayDetail ? (
        <StyleReactQuillDisplay>
          {ReactHtmlParser(resumeData.detail)}
        </StyleReactQuillDisplay>
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
          if (edit) {
            updateStudentData(identityData.email, {
              resume: { ...identityData.resume, detail: value },
            });
          }
          edit ? setEdit(false) : setEdit(true);
        }}
      />
    </StyleEditorArea>
  );
};

export default Editor;
