import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getLiveStatus, startRunGuide } from "../../Redux/Action";
import Swal from "sweetalert2";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const StyleHeader = styled.header`
  display: flex;
  top: 0;
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: ${(props) => props.headercolor};
  z-index: 1000;
  transition: all 0.2s;

  @media print {
    display: none;
  }
`;

const StyleLink = styled(Link)`
  color: ${(props) => props.headercolor};
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
  color: ${(props) => props.headercolor};
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
  background-image: ${(props) => props.headercolor};

  @media only screen and (max-width: 1020px) {
    display: ${(props) => props.layer};
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

  &:hover {
    background-image: url("/images/close-hover.png");
  }

  @media only screen and (max-width: 1020px) {
    display: ${(props) => props.layer};
  }
`;

const StyleMenuLayer = styled.div`
  display: none;

  @media only screen and (max-width: 1020px) {
    display: block;
    width: 100vw;
    height: ${(props) => props.layer};
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
  display: ${(props) => props.invitationdata};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) => props.headercolor};
`;

const StyleNewNotification = styled.div`
  position: absolute;
  right: 80px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: ${(props) => props.invitationdata};
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
  color: ${(props) => props.headercolor};
  font-size: 1rem;
`;

const StylequestionArea = styled.div`
  display: none;
  position: absolute;
  right: 80px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) => props.headercolor};

  @media only screen and (max-width: 1020px) {
    display: inline-block;
  }
`;

const Header = (props) => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus); // 視訊室狀態
  const dispatch = useDispatch();
  const history = useHistory();

  const [headerColor, setHeaderColor] = useState(false);
  const [layer, setLayer] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 5) {
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
    <StyleHeader headercolor={headerColor ? "rgb(255,255,255,0.8)" : "none"}>
      {liveStatus ? (
        <StyleLogo
          headercolor={headerColor ? "#7367f0" : "#fff"}
          liveStatus={liveStatus}>
          Re-Live
        </StyleLogo>
      ) : (
        <StyleLink headercolor={headerColor ? "#7367f0" : "#fff"} to="/">
          Re-Live
        </StyleLink>
      )}

      {liveStatus ? (
        <StylequestionArea
          headercolor={
            headerColor
              ? "url('/images/question-scroll.png')"
              : "url('/images/question-static.png')"
          }
          liveStatus={liveStatus}
          onClick={() => {
            dispatch(startRunGuide(true)); // 開始操作導覽
          }}
        />
      ) : (
        <>
          {identity === "student" ? (
            <StyleInvitationArea>
              <StyleNewNotification
                invitationdata={invitationData ? "inline-block" : "none"}
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
                      imageWidth: 130,
                      imageAlt: "theme image",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(getLiveStatus(true)); // 視訊室狀態
                        history.push("/live");
                        dispatch(startRunGuide(true)); // 開始操作導覽
                      }
                    });
                  }
                }}
              />
              <StyleNoNotification
                invitationdata={invitationData ? "none" : "inline-block"}
                headercolor={
                  headerColor
                    ? "url('/images/bell-scroll.png')"
                    : "url('/images/bell-static.png')"
                }
                onClick={() => {
                  Swal.fire({
                    title: "沒有任何視訊邀請！",
                    customClass: {
                      confirmButton: "confirm__button",
                    },
                  });
                }}
              />
              {invitationData ? (
                <StyleInvitation headercolor={headerColor ? "red" : "#ffee32"}>
                  New!
                </StyleInvitation>
              ) : null}
            </StyleInvitationArea>
          ) : null}
        </>
      )}

      <StyleMenuOpen
        headercolor={
          headerColor
            ? "url('/images/menu-scroll.png')"
            : "url('/images/menu-static.png')"
        }
        layer={layer ? "none" : "inline-block"}
        onClick={() => {
          setLayer(true);
        }}
      />

      <StyleMenuLayer layer={layer ? "40vh" : "0"}>
        <StyleCloseArea>
          <StyleMenuClose
            layer={layer ? "inline-block" : " none"}
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
