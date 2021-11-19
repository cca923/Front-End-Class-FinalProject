import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import editIcon from "../../../../images/edit.png";
import saveIcon from "../../../../images/save.png";
import firebase from "../../../../utils/config/firebase-config";

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

const StyleEditButton = styled.img`
  width: 50px;
  padding: 8px;
  background-size: 50%;
  border-radius: 15px;
  position: fixed;
  position: absolute;
  right: 0%;
  bottom: 0%;
  z-index: 1000;
  display: ${(props) => (props.hover ? "inline-block" : "none")};

  outline: 0;
  border: 0;
  cursor: pointer;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const Editor = (props) => {
  const liveData = useSelector((state) => state.liveData);
  const identityData = useSelector((state) => state.identityData);
  const identity = useSelector((state) => state.identity);
  console.log("目前的使用者", identity, identityData.email);
  const resumeData = liveData.resume;

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const studentsRef = db.collection("students").doc(liveData.email);

  const [value, setValue] = useState();
  const [edit, setEdit] = useState(false);
  // console.log(value);

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "script",
    "indent",
    "direction",
    "size",
    "header",
    "color",
    "background",
    "font",
    "align",
    "link",
  ];

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    // 初始狀態
    if (resumeData && resumeData.detail) {
      // 有過 Detail
      studentsRef.get().then((doc) => {
        setValue(doc.data().resume.detail);
      });
    }
  }, [resumeData, resumeData.detail]);

  return (
    <StyleEditorArea>
      {edit ? (
        <StyleReactQuill
          value={value}
          onChange={(value) => {
            setValue(value);
            studentsRef.update({
              // resume { about: " ", detail: " "}
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
        hover={props.hover}
        src={edit ? saveIcon : editIcon}
        onClick={() => {
          edit ? setEdit(false) : setEdit(true);
        }}
      />
    </StyleEditorArea>
  );
};

export default Editor;
