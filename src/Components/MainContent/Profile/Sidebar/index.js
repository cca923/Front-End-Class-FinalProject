import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getIdentity,
  getStudentData,
  getTeacherData,
} from "../../../../Redux/Action";
import styled from "styled-components";
import Link from "./Link";
import MobileSidebar from "./MobileSidebar";
import { userSignOut } from "../../../../utils/firebase";
import {
  uploadProfileImageSucceedAlert,
  uploadProfileImageWithPopup,
  userSignOutWithPopup,
  userSignOutSucceedAlert,
} from "../../../../utils/swal";
import { StylePurpleButton } from "../../../Common/button";
import noPhoto from "../../../../images/no-photo.png";

const StyleSidebar = styled.div`
  width: 250px;
  height: fit-content;
  background-color: #fff;
  position: absolute;
  top: 45%;
  left: 15%;
  margin-left: -10%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    width: 90%;
    height: fit-content;
    flex-direction: row;
  }

  @media print {
    display: none;
  }
`;

const StyleImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 20px auto;
  border-radius: 50%;
  background-color: #e1e1e1;
  object-fit: cover;

  @media only screen and (max-width: 1300px) {
    width: 100px;
    height: 100px;
    margin: auto 10px;
  }

  @media only screen and (max-width: 700px) {
    width: 80px;
    height: 80px;
    margin: auto 0px;
  }
`;

const StyleCamera = styled.div`
  cursor: pointer;
  position: absolute;
  left: 35px;
  top: 190px;
  width: 50px;
  height: 50px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  border: 2px solid grey;
  border-radius: 50%;
  background-image: url("/images/camera.png");

  &:hover {
    background-image: url("/images/camera-hover.png");
  }

  @media only screen and (max-width: 1300px) {
    width: 30px;
    height: 30px;
    left: 28px;
    top: 87px;
    bottom: 25px;
  }

  @media only screen and (max-width: 700px) {
    left: 15px;
    top: 75px;
    bottom: 0;
  }
`;

const StyleDetailArea = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const StyleDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  @media only screen and (max-width: 1300px) {
    justify-content: center;
    margin-bottom: 0;
  }
`;

const StyleEachDetail = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
    margin-bottom: 0px;
    padding: 10px;
  }

  @media only screen and (max-width: 700px) {
    padding: 5px;
  }
`;

const StyleLabel = styled.div`
  font-size: 1.2rem;
  width: 80px;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  border-bottom: 1px solid #7367f0;

  @media only screen and (max-width: 1300px) {
    margin: 0 20px 0 0;
    padding: 0;
    border-right: 1px solid #7367f0;
    border-bottom: 0;
    padding-bottom: 0px;
  }

  @media only screen and (max-width: 700px) {
    margin: 0 10px 0 0;
    font-size: 1rem;
    width: 60px;
  }
`;

const StyleData = styled.span`
  font-size: 1.2rem;
  text-align: center;
  font-weight: 600;
  padding: 10px;

  @media only screen and (max-width: 1300px) {
    padding: 0;
  }

  @media only screen and (max-width: 700px) {
    font-size: 1rem;
  }
`;

const StyleLogoutButton = styled(StylePurpleButton)`
  margin: 0 auto 40px auto;

  @media only screen and (max-width: 1300px) {
    margin: auto 20px;
  }

  @media only screen and (max-width: 700px) {
    width: 100px;
    margin: auto;
    line-height: 33px;
    margin: 10px auto 5px;
  }
`;

const StyleMenuLayer = styled.div`
  display: none;

  @media only screen and (max-width: 1120px) {
    height: ${(props) => (props.layer ? "10vh" : "0")};
    background-color: #e4e5e1;
    background-image: linear-gradient(180deg, #e9e9e9, #c0c0c0);

    overflow-x: hidden;
    transition: 0.5s;

    width: 100%;
    position: absolute;
    top: 100%;
    left: 10%;
    margin-left: -10%;
    display: flex;
  }
`;

const Sidebar = () => {
  const identityData = useSelector((state) => state.identityData);
  const dispatch = useDispatch();
  const history = useHistory();
  const [layer, setLayer] = useState(false);

  return (
    <StyleSidebar>
      <StyleImage src={identityData.photo || noPhoto} alt={identityData.name} />
      <StyleCamera
        onClick={async () => {
          const uploadImage = await uploadProfileImageWithPopup(
            identityData.email
          );
          if (uploadImage.isConfirmed) {
            const reader = new FileReader();
            reader.onload = (e) => {
              uploadProfileImageSucceedAlert(e);
            };
            reader.readAsDataURL(uploadImage.value);
          }
        }}
      />
      <StyleDetailArea>
        <StyleDetail>
          <StyleEachDetail>
            <StyleLabel>姓名</StyleLabel>
            <StyleData>{identityData.name}</StyleData>
          </StyleEachDetail>
          <StyleEachDetail>
            <StyleLabel>Email</StyleLabel>
            <StyleData>{identityData.email}</StyleData>
          </StyleEachDetail>
        </StyleDetail>
        <StyleLogoutButton
          onClick={async () => {
            const signOut = await userSignOutWithPopup(identityData.email);
            if (signOut.isConfirmed) {
              await userSignOut();
              await userSignOutSucceedAlert(identityData.email);

              history.push("/");
              dispatch(getIdentity(""));
              dispatch(getStudentData({}));
              dispatch(getTeacherData({}));
            }
          }}>
          登出
        </StyleLogoutButton>
      </StyleDetailArea>

      <Link layer={layer} setLayer={setLayer} />

      <StyleMenuLayer layer={layer}>
        <MobileSidebar />
      </StyleMenuLayer>
    </StyleSidebar>
  );
};

export default Sidebar;
