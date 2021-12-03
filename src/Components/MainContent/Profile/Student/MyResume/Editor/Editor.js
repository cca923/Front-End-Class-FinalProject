import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

import { updateStudentData } from "../../../../../../utils/firebase";
import { formats, modules } from "../../../../../../utils/quillEditor";
import { StylePurpleButton } from "../../../../../Common/button";

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
  padding: 50px 30px 30px;
  word-wrap: break-word;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }

  @media only screen and (max-width: 700px) {
    padding: 50px 0px 0px;
  }
`;

const StyleEditButton = styled(StylePurpleButton)`
  position: absolute;
  right: 0px;
  top: ${(props) => (props.edit ? "-43px" : "0")};
  width: 120px;
  line-height: 37px;
  z-index: 1000;

  @media only screen and (max-width: 500px) {
    width: 90px;
  }

  @media print {
    display: none;
  }
`;

const StyleEditIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 15px;
  margin-right: 8px;
  cursor: pointer;
`;

const StyleSaveIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 15px;
  margin-right: 8px;
  cursor: pointer;
`;

const Editor = ({ edit, setEdit }) => {
  const identityData = useSelector((state) => state.identityData);
  const resumeData = identityData.resume;
  // resume: { about: " ", detail: " " }

  const [value, setValue] = useState();
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
      updateStudentData(identityData.email, {
        resume: { ...identityData.resume, detail },
      }).then(() => {
        setValue(detail);
        setDisplayDetail(true);
      });
    } else if (resumeData && resumeData.detail) {
      setValue(resumeData.detail);
      setDisplayDetail(true);
    }
  }, [resumeData]);

  return (
    <StyleEditorArea>
      {edit ? (
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
        edit={edit}
        onClick={() => {
          if (edit) {
            updateStudentData(identityData.email, {
              resume: { ...identityData.resume, detail: value },
            });
          }
          edit ? setEdit(false) : setEdit(true);
        }}>
        {edit ? (
          <>
            <StyleSaveIcon icon={faSave} color="#fff" />
            儲存
          </>
        ) : (
          <>
            <StyleEditIcon icon={faEdit} color="#fff" />
            編輯
          </>
        )}
      </StyleEditButton>
    </StyleEditorArea>
  );
};

export default Editor;
