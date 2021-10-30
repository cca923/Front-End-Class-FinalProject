import React, { useState } from "react";
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import editIcon from "../../../../images/edit.png";
import saveIcon from "../../../../images/save.png";

const StyleEditorArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyleReactQuill = styled(ReactQuill)`
  width: 100%;
  z-index: 1000;
`;

const StyleReactQuillDisplay = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const StyleEditButton = styled.img`
  width: 50px;
  padding: 8px;
  background-size: 50%;
  border-radius: 15px;
  position: fixed;
  right: 72%;
  top: 50%;
  color: white;
  background-color: #757bc8;
  border: 2px solid #bbadff;
  cursor: pointer;
  z-index: 1000;
  display: ${(props) => (props.hover ? "inline-block" : "none")};

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
  }
`;

const Editor = (props) => {
  const resume = `
    <h1>Work Experience</h1>
    <h1>Education</h1>
    <h1>Skill</h1>
  `;

  const [value, setValue] = useState(resume);
  const [edit, setEdit] = useState(false);

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
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
    ["blockquote", "link"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <StyleEditorArea>
      {edit ? (
        <StyleReactQuill
          placeholder="開始編輯履歷吧！"
          value={value}
          onChange={(value) => setValue(value)}
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
