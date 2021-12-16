import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getLiveStatus, startRunGuide } from "../../Redux/Action";
import { handleConfirmedWithPopup, warningAlert } from "../../utils/swal";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

const StyleHeader = styled.header`
  display: flex;
  top: 0;
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: ${(props) =>
    props.headerstatus === "scroll" ? "rgb(255,255,255,0.8)" : "none"};
  z-index: 1000;
  transition: all 0.2s;

  @media print {
    display: none;
  }
`;

const StyleLink = styled(Link)`
  color: ${(props) => (props.headerstatus === "scroll" ? "#7367f0" : "#fff")};
  line-height: 100px;
  padding: 0px 20px;
  font-size: 60px;
  font-weight: 600;

  /* -webkit-text-fill-color: ${(props) =>
    props.headerstatus ? "none" : "#7367f0"};
  -webkit-text-stroke-width: ${(props) =>
    props.headerstatus ? "none" : "2px"};
  -webkit-text-stroke-color: ${(props) =>
    props.headerstatus ? "none" : "#fff"}; */
`;

const StyleLogo = styled.div`
  color: ${(props) => (props.headerstatus === "scroll" ? "#7367f0" : "#fff")};
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
    props.headerstatus === "scroll"
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

  &:hover {
    background-image: url("/images/close-hover.png");
  }

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
  display: ${(props) => (props.invitationdata ? "none" : "inline-block")};
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.headerstatus === "scroll"
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
  display: ${(props) => (props.invitationdata ? "inline-block" : "none")};
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
  color: ${(props) => (props.headerstatus === "scroll" ? "red" : "#ffee32")};
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
  background-image: ${(props) =>
    props.headerstatus === "scroll"
      ? "url('/images/question-scroll.png')"
      : "url('/images/question-static.png')"};

  @media only screen and (max-width: 1020px) {
    display: inline-block;
  }
`;

const Header = ({ currentUser }) => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  const [headerStatus, setheaderStatus] = useState("static");
  const [layer, setLayer] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 5) {
      setheaderStatus("scroll");
    } else {
      setheaderStatus("static");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <StyleHeader headerstatus={headerStatus}>
      {liveStatus ? (
        <StyleLogo headerstatus={headerStatus} liveStatus={liveStatus}>
          Re-Live
        </StyleLogo>
      ) : (
        <StyleLink headerstatus={headerStatus} to="/">
          Re-Live
        </StyleLink>
      )}

      {liveStatus ? (
        <StylequestionArea
          headerstatus={headerStatus}
          liveStatus={liveStatus}
          onClick={() => {
            dispatch(startRunGuide(true));
          }}
        />
      ) : (
        <>
          {identity === "student" ? (
            <StyleInvitationArea>
              <StyleNewNotification
                invitationdata={invitationData}
                onClick={async () => {
                  if (invitationData) {
                    const goLive = await handleConfirmedWithPopup(
                      `預約對象｜${invitationData.name}`,
                      "正在邀請您前往視訊！",
                      "Go｜前往",
                      "/images/theme/theme-3.png"
                    );
                    if (goLive.isConfirmed) {
                      dispatch(getLiveStatus(true));
                      history.push("/live");
                      dispatch(startRunGuide(true));
                    }
                  }
                }}
              />
              <StyleNoNotification
                invitationdata={invitationData}
                headerstatus={headerStatus}
                onClick={async () => {
                  await warningAlert("沒有任何視訊邀請！");
                }}
              />
              {invitationData ? (
                <StyleInvitation headerstatus={headerStatus}>
                  New!
                </StyleInvitation>
              ) : null}
            </StyleInvitationArea>
          ) : null}
        </>
      )}

      <StyleMenuOpen
        headerstatus={headerStatus}
        layer={layer}
        onClick={() => setLayer(true)}
      />

      <StyleMenuLayer layer={layer}>
        <StyleCloseArea>
          <StyleMenuClose layer={layer} onClick={() => setLayer(false)} />
        </StyleCloseArea>
        <MobileNav currentUser={currentUser} />
      </StyleMenuLayer>

      <Nav
        layer={layer}
        headerStatus={headerStatus}
        currentUser={currentUser}
      />
    </StyleHeader>
  );
};

export default Header;
