import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdentity } from "../../../../Redux/Action";
import styled from "styled-components";
import EasyEdit, { Types } from "react-easy-edit";
import "../../../../css/edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const StyleCustomDisplay = styled.div`
  display: inline-block;
  word-wrap: break-word;
  max-width: 100%;
  resize: none;
  margin: 10px 0px;
`;

const EditArea = (props) => {
  const identity = useSelector((state) => state.identity);
  console.log(identity);

  const CustomDisplay = (props) => {
    const val = props.value || "點擊以修改文字！";
    return <StyleCustomDisplay ref={props.sendEdit}>{val}</StyleCustomDisplay>;
  };

  return (
    <EasyEdit
      type={Types.TEXTAREA}
      value=""
      placeholder="請輸入文字"
      saveButtonLabel={<FontAwesomeIcon icon={faCheck} color="green" />}
      cancelButtonLabel={<FontAwesomeIcon icon={faTimes} color="red" />}
      displayComponent={<CustomDisplay sendEdit={props.sendEdit} />}
      onSave={(value) => {
        console.log(props.sendEdit.current);
      }}></EasyEdit>
  );
};

export default EditArea;
