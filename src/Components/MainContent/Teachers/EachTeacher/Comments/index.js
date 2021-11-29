import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

import EachComment from "./EachComment";

const StyleTitle = styled.div`
  display: ${(props) => (props.teacherComments ? "block" : "none")};
  font-size: 3rem;
  font-weight: 800;
  padding: 20px 30px;
  width: 100%;
  line-height: 50px;
  height: fit-content;
  background-color: #f3f3f3;
  margin-top: 40px;
`;

const StyleComments = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #f3f3f3;
  padding: 10px 40px 40px;
  margin-bottom: 60px;
  display: ${(props) => (props.teacherComments ? "grid" : "none")};
  grid-gap: 0px 40px;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 40px 0px;
  }
`;

const StyleMoreButton = styled.div`
  width: 120px;
  margin: 20px auto 0 0;
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-bottom: solid 3px #e66158;
  border-left: solid 3px #e66158;
  color: #e66158;
  transition: 0.4s;
  display: ${(props) => (props.more ? "none" : "block")};
  cursor: pointer;

  &:hover {
    padding-top: 0.8em;
    padding-right: 0.3em;
  }
`;

const StyleIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

const StyleCommentsLayer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #979797;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 20000;
`;

const StyleMoreCommentsWrap = styled.div`
  background-color: #f3f3f3;
  z-index: 20000;
  overflow-y: scroll;
  max-width: 100%;
  height: calc(100vh - 160px);
  position: fixed;
  top: 0;
  left: 0;
  margin: 80px 100px;

  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    margin: 80px 20px;
    width: calc(100vw - 40px);
  }
`;

const Comments = ({ eachTeacherData }) => {
  const teacherComments = eachTeacherData.comments;
  const [more, setMore] = useState(false);

  return (
    <>
      <StyleTitle teacherComments={teacherComments}>Comments</StyleTitle>
      <StyleComments teacherComments={teacherComments} more={more}>
        {teacherComments ? (
          <>
            {teacherComments.slice(-3).map((eachComment) => {
              return <EachComment key={nanoid()} eachComment={eachComment} />;
            })}
            {more ? (
              <>
                <StyleCommentsLayer
                  onClick={() => {
                    setMore(false);
                  }}
                />
                <StyleMoreCommentsWrap>
                  {teacherComments.map((eachComment) => {
                    return (
                      <EachComment
                        key={nanoid()}
                        eachComment={eachComment}
                        more={more}
                      />
                    );
                  })}
                </StyleMoreCommentsWrap>
              </>
            ) : null}

            {teacherComments.length > 3 ? (
              <StyleMoreButton
                more={more}
                onClick={() => {
                  setMore(true);
                }}>
                查看更多
                <StyleIcon icon={faCaretDown} color="#e66158" />
              </StyleMoreButton>
            ) : null}
          </>
        ) : null}
      </StyleComments>
    </>
  );
};

export default Comments;
