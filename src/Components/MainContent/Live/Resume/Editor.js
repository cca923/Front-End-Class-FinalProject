import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

import {
  fetchStudentData,
  updateStudentData,
} from "../../../../utils/firebase";
import { formats, modules } from "../../../../utils/quillEditor";
import { StylePurpleButton } from "../../../Common/button";

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
  padding: 50px 20px 0px;
  word-wrap: break-word;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }

  @media only screen and (max-width: 650px) {
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
  const liveData = useSelector((state) => state.liveData);
  const resumeData = liveData.resume;

  const [value, setValue] = useState();

  useEffect(() => {
    if (resumeData && resumeData?.detail) {
      fetchStudentData(liveData.email).then((doc) => {
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
        edit={edit}
        onClick={() => {
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
