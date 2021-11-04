import React from "react";
import styled from "styled-components";

const StyleMyClass = styled.div`
  width: 100%;
  background-color: white;
`;

const StyleTitle = styled.div`
  font-size: 3rem;
  font-weight: 800;
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: #f3f3f3;
`;

const StyleStudentReservation = styled.div`
  background-color: #aca5b6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px 30px;
  /* max-width: 1160 px; */
  /* padding: 70 px 24 px; */
  margin: 0 auto;
  padding: 50px 30px;

  @media only screen and (max-width: 1020px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px 20px;
  }
`;

const StyleEachTeacher = styled.div`
  width: 100%;
  height: 290px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media only screen and (max-width: 1020px) {
    height: 120px;
    flex-direction: row;
  }

  @media only screen and (max-width: 650px) {
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
  background-color: grey;
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
  border-right: 1px solid #7678ed;
  margin-right: 10px;
`;

const StyleData = styled.span``;

const StyleChat = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0px;
  padding: 10px;
  width: 120px;
  font-size: 1rem;
  color: white;
  background-color: #757bc8;
  border: 2px solid #bbadff;
  border-radius: 18px;
  margin: 0 auto 20px auto;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #bbadff;
    border: 2px solid #757bc8;
    color: black;
  }
`;

const StudentMyClass = (props) => {
  return (
    <StyleMyClass>
      <StyleTitle>Reservation</StyleTitle>
      <StyleStudentReservation>
        <StyleEachTeacher>
          <StyleOrderNumber>
            訂單編號：
            <span>00000000000</span>
          </StyleOrderNumber>
          <StyleImage alt={"name"} />
          <StyleDetail>
            <StyleEachDetail>
              <StyleLabel>姓名</StyleLabel>
              <StyleData>Anna</StyleData>
            </StyleEachDetail>
            <StyleEachDetail>
              <StyleLabel>Email </StyleLabel>
              <StyleData>anna85923@gmail.com</StyleData>
            </StyleEachDetail>
            <StyleEachDetail>
              <StyleLabel>日期</StyleLabel>
              <StyleData>2021/10/26 上午09:00</StyleData>
            </StyleEachDetail>

            <StyleChat>和他聊聊</StyleChat>
          </StyleDetail>
        </StyleEachTeacher>
      </StyleStudentReservation>
    </StyleMyClass>
  );
};

export default StudentMyClass;
