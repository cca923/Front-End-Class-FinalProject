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
import { successAlert } from "../../../../utils/swal";
import { StylePurpleButton } from "../../../Common/button";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  position: relative;
  margin-top: 20px;
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
  padding: 0 30px 30px;
  word-wrap: break-word;

  a {
    text-decoration: underline;
    color: #4267b2;
  }

  h1 {
    line-height: 2.5rem;
  }

  @media only screen and (max-width: 650px) {
    padding: 0;
  }
`;

const StyleEditButtonArea = styled.div`
  width: 100%;
  height: fit-content;
`;

const StyleEditButton = styled(StylePurpleButton)`
  width: 120px;
  line-height: 37px;
  z-index: 800;
  margin-left: auto;

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

const Editor = () => {
  const liveData = useSelector((state) => state.liveData);
  const resumeData = liveData.resume;

  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (resumeData?.detail) {
      fetchStudentData(liveData.email).then((doc) => {
        setValue(doc.data().resume.detail);
      });
    } else {
      setValue("該用戶尚未編輯過履歷");
    }
  }, [resumeData, resumeData?.detail]);

  return (
    <>
      <StyleEditButtonArea>
        <StyleEditButton
          onClick={async () => {
            if (edit) {
              await successAlert("儲存成功！");
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
      </StyleEditButtonArea>

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
      </StyleEditorArea>
    </>
  );
};

export default Editor;
