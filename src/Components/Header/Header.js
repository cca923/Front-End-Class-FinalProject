import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getLiveStatus } from "../../Redux/Action";
import Swal from "sweetalert2";
import video from "../../images/video-on.png";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const StyleHeader = styled.header`
  display: flex;
  top: 0;
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: ${(props) =>
    props.headerColor ? "rgb(255,255,255,0.8)" : "none"};
  z-index: 1000;

  @media print {
    display: none;
  }
`;

const StyleLink = styled(Link)`
  color: ${(props) => (props.headerColor ? "#7367f0" : "#fff")};
  line-height: 100px;
  padding: 0px 20px;
  font-size: 60px;
  font-weight: 600;

  /* -webkit-text-fill-color: ${(props) =>
    props.headerColor ? "none" : "#7367f0"};
  -webkit-text-stroke-width: ${(props) => (props.headerColor ? "none" : "2px")};
  -webkit-text-stroke-color: ${(props) =>
    props.headerColor ? "none" : "#fff"}; */
`;

const StyleLogo = styled.div`
  color: ${(props) => (props.headerColor ? "#7367f0" : "#fff")};
  line-height: 100px;
  padding: 0px 20px;
  font-size: 60px;
  font-weight: 600;
  cursor: not-allowed;
`;

const StyleMenuOpen = styled.div`
  display: none;
  width: 30px;
  height: 30px;
  margin: auto 30px auto auto;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.headerColor
      ? "url('/images/menu-scroll.png')"
      : "url('/images/menu-static.png')"};

  @media only screen and (max-width: 1020px) {
    display: ${(props) => (props.layer ? "none" : "inline-block")};
  }
`;

const StyleCloseArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
`;

const StyleMenuClose = styled.div`
  display: none;
  width: 30px;
  height: 30px;
  margin: auto 30px auto auto;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: url("/images/close.png");

  @media only screen and (max-width: 1020px) {
    display: ${(props) => (props.layer ? "inline-block" : " none")};
  }
`;

const StyleMenuLayer = styled.div`
  display: none;

  @media only screen and (max-width: 1020px) {
    display: block;
    width: 100vw;
    height: ${(props) => (props.layer ? "40vh" : "0")};
    position: fixed;
    top: 0;
    /* right: 0; */
    background-color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
  }
`;

const StyleInvitationArea = styled.div`
  display: none;

  @media only screen and (max-width: 1020px) {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 0px 40px;
  }
`;

const StyleNoNotification = styled.div`
  position: absolute;
  right: 80px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: ${(props) => (props.invitationData ? "none" : "inline-block")};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.headerColor
      ? "url('/images/bell-scroll.png')"
      : "url('/images/bell-static.png')"};
`;

const StyleNewNotification = styled.div`
  position: absolute;
  right: 80px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: ${(props) => (props.invitationData ? "inline-block" : "none")};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: url("/images/bell.gif");
  border-radius: 50%;
  padding: 5px;
  opacity: 0.8;
`;

const StyleInvitation = styled.div`
  position: absolute;
  right: 80px;
  top: 65px;
  width: 30px;
  height: 30px;
  color: red;
  font-size: 1rem;
`;

const Header = () => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus); // 視訊室狀態
  const dispatch = useDispatch();
  const history = useHistory();

  const [headerColor, setHeaderColor] = useState(false);
  const [layer, setLayer] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <StyleHeader headerColor={headerColor}>
      {liveStatus ? (
        <StyleLogo headerColor={headerColor} liveStatus={liveStatus}>
          Re-Live
        </StyleLogo>
      ) : (
        <StyleLink headerColor={headerColor} to="/">
          Re-Live
        </StyleLink>
      )}

      {liveStatus ? null : (
        <>
          {identity === "student" ? (
            <StyleInvitationArea headerColor={headerColor}>
              <StyleNewNotification
                invitationData={invitationData}
                onClick={() => {
                  if (invitationData) {
                    Swal.fire({
                      title: `預約對象｜${invitationData.name}`,
                      html: `<h3>正在邀請您前往視訊！</h3>`,
                      confirmButtonText: "Go｜前往",
                      showLoaderOnConfirm: true,
                      showCancelButton: true,
                      cancelButtonText: "Cancel｜取消",
                      showCloseButton: true,
                      customClass: {
                        confirmButton: "confirm__button",
                        cancelButton: "cancel__button",
                      },
                      imageUrl: "/images/theme/theme-7.png",
                      imageWidth: 200,
                      imageAlt: "theme image",
                    }).then((result) => {
                      if (result.isConfirmed) {
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
                      }
                    });
                  }
                }}
              />
              <StyleNoNotification
                invitationData={invitationData}
                headerColor={headerColor}
                onClick={() => {
                  Swal.fire({
                    title: "沒有任何視訊邀請！",
                    customClass: {
                      confirmButton: "confirm__button",
                    },
                  });
                }}
              />
              {invitationData ? <StyleInvitation>New!</StyleInvitation> : null}
            </StyleInvitationArea>
          ) : null}
        </>
      )}

      <StyleMenuOpen
        headerColor={headerColor}
        layer={layer}
        onClick={() => {
          setLayer(true);
        }}
      />

      <StyleMenuLayer layer={layer}>
        <StyleCloseArea>
          <StyleMenuClose
            headerColor={headerColor}
            layer={layer}
            onClick={() => {
              setLayer(false);
            }}
          />
        </StyleCloseArea>
        <MobileNav />
      </StyleMenuLayer>

      <Nav layer={layer} headerColor={headerColor} />
    </StyleHeader>
  );
};

export default Header;
