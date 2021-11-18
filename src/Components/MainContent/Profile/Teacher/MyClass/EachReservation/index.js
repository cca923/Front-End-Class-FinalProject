import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLiveData, getLiveStatus } from "../../../../../../Redux/Action";
import styled from "styled-components";
import firebase from "../../../../../../utils/config/firebase-config";
import Swal from "sweetalert2";
import Resume from "./Resume";
import video from "../../../../../../images/video-on.png";
import noPhoto from "../../../../../../images/resume-noPhoto.png";

const StyleEachStudent = styled.div`
  width: 100%;
  height: 290px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 5px;

  @media only screen and (max-width: 1020px) {
    height: 120px;
    flex-direction: row;
  }

  @media only screen and (max-width: 720px) {
    height: 270px;
    flex-direction: column;
  }
`;

const StyleOrderNumber = styled.div`
  position: absolute;
  right: 10px;
  font-size: 10px;
  color: grey;
`;

const StyleImage = styled.img`
  width: 100px;
  height: 100px;
  background-color: #e1e1e1;
`;

const StyleDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0 10px;

  @media only screen and (max-width: 1020px) {
    width: calc(100% - 100px);
    padding: 17px 10px 0 20px;
  }

  @media only screen and (max-width: 650px) {
    width: 100%;
    padding: 17px 10px 0 10px;
  }
`;

const StyleEachDetail = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyleLabel = styled.div`
  width: 50px;
  border-right: 1px solid #7367f0;
  margin-right: 10px;
`;

const StyleData = styled.span``;

const StyleResume = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0px;
  width: 100px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  line-height: 38px;
  margin: 0 auto 20px auto;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleLive = styled.div`
  position: absolute;
  right: 130px;
  bottom: 0px;
  width: 100px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  line-height: 38px;
  margin: 0 auto 20px auto;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

  /* position: absolute;
  right: 130px;
  bottom: 0px;
  padding: 10px;
  width: 100px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border: 2px solid #bbadff;
  border-radius: 18px;
  margin: 0 auto 20px auto;
  cursor: pointer;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  } */
`;

const EachReservation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const db = firebase.firestore();
  const studentsCollection = db.collection("students");
  const [studentData, setStudentData] = useState([]);
  // console.log("該學生的資料", studentData);
  const [displayResume, setDisplayResume] = useState(false);

  useEffect(() => {
    studentsCollection
      .where("email", "==", props.eachReservation.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setStudentData(doc.data());
        });
      })
      .catch((error) => {
        console.log("資料讀取錯誤", error);
      });
  }, []);

  const time = new Date(props.eachReservation.time).toLocaleString(
    navigator.language,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <StyleEachStudent>
      <StyleOrderNumber>
        預定編號：
        <span>{props.eachReservation.time}</span>
      </StyleOrderNumber>
      <StyleImage alt={studentData.name} src={studentData.photo || noPhoto} />
      <StyleDetail>
        <StyleEachDetail>
          <StyleLabel>姓名</StyleLabel>
          <StyleData>{studentData.name}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>Email </StyleLabel>
          <StyleData>{props.eachReservation.email}</StyleData>
        </StyleEachDetail>
        <StyleEachDetail>
          <StyleLabel>日期</StyleLabel>
          <StyleData>{time}</StyleData>
        </StyleEachDetail>

        {new Date(props.eachReservation.time) > new Date() ? (
          <StyleLive
            onClick={() => {
              Swal.fire({
                title: `預約時間｜${time}`,
                html: `<h3>預約姓名｜${studentData.name}</h3>`,
                confirmButtonText: "Go｜前往",
                showCancelButton: true,
                cancelButtonText: "Cancel｜取消",
                customClass: {
                  confirmButton: "confirm__button",
                  cancelButton: "cancel__button",
                },
                imageUrl: "/images/theme/theme-3.png",
                imageWidth: 200,
                imageAlt: "theme image",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(getLiveData(studentData));
                  dispatch(getLiveStatus(true)); // 視訊室狀態

                  history.push("/live");
                  Swal.fire({
                    html: `<img src="${video}" 
                    style="
                    width: 100px;
                    height: 100px; 
                    border-radius: 50%;
                    padding: 20px;
                    margin: auto;
                    display: inline-block;
                    align-content: center;
                    background-size: cover;
                    background-position: center;
                    background-color: #595959;
                    border: 5px solid #c3c3c3;
                    "></img>`,
                    title: `請先開啟視訊鏡頭！`,
                    customClass: {
                      confirmButton: "confirm__button",
                    },
                  });
                } else if (result.isDenied) {
                  dispatch(getLiveData(null));
                  dispatch(getLiveStatus(false)); // 視訊室狀態
                  console.log();
                }
              });
            }}>
            前往視訊
          </StyleLive>
        ) : null}

        <StyleResume
          onClick={() => {
            setDisplayResume(true);
          }}>
          他的履歷
        </StyleResume>
        {displayResume ? (
          <Resume
            setDisplayResume={setDisplayResume}
            studentData={studentData}
          />
        ) : null}
      </StyleDetail>
    </StyleEachStudent>
  );
};

export default EachReservation;
