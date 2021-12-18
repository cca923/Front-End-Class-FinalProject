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
import { successAlert } from "../../../../../../utils/swal";
import { StylePurpleButton } from "../../../../../Common/button";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  position: relative;
  margin-top: 20px;
`;

const StyleReactQuill = styled(ReactQuill)`
  width: 100%;
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: fit-content;
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

  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`;

const StyleEditButtonArea = styled.div`
  width: 100%;
  height: fit-content;

  @media print {
    display: none;
  }
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
  const identityData = useSelector((state) => state.identityData);
  const resumeData = identityData.resume;
  // resume: { about: " ", detail: " " }

  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);

  const defaultDetail = `
    <h1>Work Experience</h1>
    <h1>Education</h1>
    <h1>Skill</h1>
  `;

  useEffect(() => {
    if (!resumeData) {
      setValue(defaultDetail);
    } else if (!resumeData.detail) {
      setValue(defaultDetail);
    } else if (resumeData.detail) {
      setValue(resumeData.detail);
      setDisplayDetail(true);
    }
    return null;
  }, [resumeData]);

  return (
    <>
      <StyleEditButtonArea>
        <StyleEditButton
          edit={edit}
          onClick={async () => {
            if (edit) {
              await updateStudentData(identityData.email, {
                resume: { ...identityData.resume, detail: value },
              });
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
              value={value} // value = defaultDetail
              onChange={(value) => setValue(value)}
              modules={modules}
              formats={formats}
            />
          )
        ) : displayDetail ? (
          <StyleReactQuillDisplay>
            {ReactHtmlParser(value)}
          </StyleReactQuillDisplay>
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
