import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getIdentity,
  getStudentData,
  getTeacherData,
} from "../../../Redux/Action";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "../../../utils/config/firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import noPhoto from "../../../images/no-photo.png";
import MobileSidebar from "./MobileSidebar";

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

const StyleLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  @media only screen and (max-width: 1300px) {
    flex-direction: row;
    margin-left: auto;
    margin-top: 0;
  }
`;

const StyleLink = styled(NavLink)`
  width: 150px;
  font-size: 1.5rem;
  position: relative;
  display: inline-flex;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #e66158;
  transition: 0.3s;
  margin: 0 auto 20px;

  &:hover {
    padding-left: 0.7em;
    background-color: #f3f3f3;
  }

  @media only screen and (max-width: 1300px) {
    margin: auto 15px;
    width: 160px;
    font-size: 1.5rem;
    position: relative;
    display: inline-flex;
    font-weight: bold;
    padding: 0.25em 0.5em;
    text-decoration: none;
    color: #e66158;
    transition: 0.3s;

    &:hover {
      padding-left: 0.5em;
      padding-top: 0.7em;
      background-color: #f3f3f3;
    }
  }

  @media only screen and (max-width: 1120px) {
    display: none;
  }
`;

const StyleLogoutButton = styled.div`
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  line-height: 38px;
  margin: 0 auto 40px auto;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }

  @media only screen and (max-width: 1300px) {
    margin: auto 20px;
  }

  @media only screen and (max-width: 700px) {
    width: 100px;
    margin: auto;
    line-height: 33px;
    margin: 10px auto 5px auto;
  }
`;

const StyleIconDown = styled(FontAwesomeIcon)`
  margin-left: auto;
  display: none;

  @media only screen and (max-width: 1300px) {
    display: inline-block;
  }
`;

const StyleMobileIconDown = styled(FontAwesomeIcon)`
  display: none;

  @media only screen and (max-width: 1120px) {
    display: inline-block;
    font-size: 30px;
    margin-top: auto;
    cursor: pointer;
  }
`;

const StyleIconRight = styled(FontAwesomeIcon)`
  margin-left: auto;
  display: inline-block;

  @media only screen and (max-width: 1300px) {
    display: none;
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

const Sidebar = (props) => {
  const identity = useSelector((state) => state.identity);
  const identityData = useSelector((state) => state.identityData);
  const dispatch = useDispatch();
  const history = useHistory();

  const storage = firebase.storage();
  const db = firebase.firestore();
  const teachersRef = db.collection("teachers").doc(identityData.email);
  const studentsRef = db.collection("students").doc(identityData.email);

  const [layer, setLayer] = useState(false);

  return (
    <StyleSidebar>
      <StyleImage src={identityData.photo || noPhoto} alt={identityData.name} />
      <StyleCamera
        onClick={() => {
          Swal.fire({
            title: "更新顯示照片",
            input: "file",
            inputPlaceholder: "請選擇照片",
            inputAttributes: {
              accept: "image/*",
              "aria-label": "請選擇照片",
            },
            showCloseButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: "Upload｜上傳",
            showCancelButton: true,
            cancelButtonText: "Cancel｜取消",
            customClass: {
              confirmButton: "confirm__button",
              cancelButton: "cancel__button",
            },
            preConfirm: (value) => {
              const fileRef = storage.ref(
                "profile-picture/" + identityData.email
              );
              const metadata = {
                contentType: value.type,
              };

              fileRef.put(value, metadata).then(() => {
                fileRef.getDownloadURL().then((imageUrl) => {
                  teachersRef
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        teachersRef.update({
                          photo: imageUrl, // 加入照片 URL
                        });
                      }
                    })
                    .catch((error) => {
                      console.log("資料讀取有誤：", error);
                    });

                  studentsRef
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        studentsRef.update({
                          photo: imageUrl, // 加入照片 URL
                        });
                      }
                    })
                    .catch((error) => {
                      console.log("資料讀取有誤：", error);
                    });
                });
              });
            },
            inputValidator: (value) => {
              if (!value) {
                return "沒有上傳任何照片檔案喔！";
              }
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const reader = new FileReader();
              reader.onload = (e) => {
                Swal.fire({
                  title: "顯示照片更新成功",
                  imageUrl: e.target.result,
                  imageAlt: "顯示照片更新成功",
                  customClass: {
                    confirmButton: "confirm__button",
                    image: "upload__image",
                  },
                });
              };
              reader.readAsDataURL(result.value);
            }
          });
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
          onClick={() => {
            Swal.fire({
              title: `登出｜Sign out`,
              html: `<h3>是否要登出 ${identityData.email}？</h3>`,
              confirmButtonText: "Sign out｜登出",
              showLoaderOnConfirm: true,
              showCancelButton: true,
              cancelButtonText: "Cancel｜取消",
              customClass: {
                confirmButton: "confirm__button",
                cancelButton: "cancel__button",
              },
              imageUrl: "/images/theme/theme-13.png",
              imageWidth: 200,
              imageAlt: "theme image",
            }).then((result) => {
              if (result.isConfirmed) {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    Swal.fire({
                      timer: 1200,
                      timerProgressBar: true,
                      showConfirmButton: false,
                      title: "登出成功，將回到首頁！",
                      text: `登出 Email｜${identityData.email}`,
                      icon: "success",
                    }).then(() => {
                      // 設回原樣！
                      history.push("/");
                      dispatch(getIdentity(""));
                      dispatch(getStudentData({}));
                      dispatch(getTeacherData({}));
                    });
                  });
              }
            });
          }}>
          登出
        </StyleLogoutButton>
      </StyleDetailArea>

      <StyleLinkContainer>
        {identity === "student" ? (
          <>
            <StyleLink
              exact
              to="/profile/myresume"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#ebe9e9 " }}>
              My Resume
              <StyleIconDown icon={faCaretDown} color="#e66158" />
              <StyleIconRight icon={faCaretRight} color="#e66158" />
            </StyleLink>
            <StyleLink
              exact
              to="/profile/myclass"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#ebe9e9 " }}>
              My Class
              <StyleIconDown icon={faCaretDown} color="#e66158" />
              <StyleIconRight icon={faCaretRight} color="#e66158" />
            </StyleLink>
          </>
        ) : (
          <>
            <StyleLink
              exact
              to="/profile/myprofile"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#ebe9e9 " }}>
              My Profile
              <StyleIconDown icon={faCaretDown} color="#e66158" />
              <StyleIconRight icon={faCaretRight} color="#e66158" />
            </StyleLink>
            <StyleLink
              exact
              to="/profile/myclass"
              activeClassName="selected"
              activeStyle={{ backgroundColor: "#ebe9e9 " }}>
              My Class
              <StyleIconDown icon={faCaretDown} color="#e66158" />
              <StyleIconRight icon={faCaretRight} color="#e66158" />
            </StyleLink>
          </>
        )}
        <StyleMobileIconDown
          icon={layer ? faCaretUp : faCaretDown}
          color="#e66158"
          onClick={() => {
            layer ? setLayer(false) : setLayer(true);
          }}
        />
      </StyleLinkContainer>

      <StyleMenuLayer layer={layer}>
        <MobileSidebar />
      </StyleMenuLayer>
    </StyleSidebar>
  );
};

export default Sidebar;
