import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { fetchTeacherDataByUid } from "../../../../utils/firebase";

import loading from "../../../../images/loading.gif";

import Calender from "./Calender";
import Comments from "./Comments/index";
import Introduction from "./Introduction/index";

const StyleEachTeacher = styled.div`
  width: 100%;
`;

const StyleHeaderArea = styled.div`
  width: 100%;
  height: 100px;
  background-color: #7367f0;
`;

const StyleIntroductionArea = styled.div`
  width: 90%;
  height: fit-content;
  margin: 50px auto 0;
`;

const StyleAvailableTimeArea = styled.div`
  width: 90%;
  height: fit-content;
  margin: 0 auto 50px;
`;

const StyleStateWrap = styled.div`
  display: flex;
  width: 100%;
`;

const StyleLoading = styled.img`
  width: 50%;
  margin: 0 auto;
  height: 350px;
  object-fit: cover;
`;

const EachTeacher = () => {
  const params = useParams();
  const history = useHistory();
  
  const [eachTeacherData, setEachTeacherData] = useState();

  useEffect(() => {
    fetchTeacherDataByUid(params.teacherUid).then((docs) => {
      if (docs.empty) {
        history.push("/404");
      } else {
        docs.forEach((doc) => {
          setEachTeacherData(doc.data());
        });
      }
    });
  }, []);

  return (
    <StyleEachTeacher>
      <StyleHeaderArea />
      {eachTeacherData ? (
        <>
          <StyleIntroductionArea>
            <Introduction eachTeacherData={eachTeacherData} />
          </StyleIntroductionArea>
          <Comments eachTeacherData={eachTeacherData} />
          <StyleAvailableTimeArea>
            <Calender eachTeacherData={eachTeacherData} />
          </StyleAvailableTimeArea>
        </>
      ) : (
        <StyleStateWrap>
          <StyleLoading src={loading} alt={"loading"} />
        </StyleStateWrap>
      )}
    </StyleEachTeacher>
  );
};

export default EachTeacher;
