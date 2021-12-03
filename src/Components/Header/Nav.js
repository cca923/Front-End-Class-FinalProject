import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  changeSignPage,
  getLiveStatus,
  startRunGuide,
} from "../../Redux/Action";
import { handleConfirmedWithPopup, warningAlert } from "../../utils/swal";

const StyleNav = styled.nav`
  margin-left: auto;
  line-height: 100px;
  position: relative;

  @media only screen and (max-width: 1020px) {
    display: none;
  }
`;

const StyleLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerstatus === "scroll" ? "#222" : "#fff")};
  border-left: 3px solid
    ${(props) => (props.headerstatus === "scroll" ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;

  :hover {
    color: ${(props) =>
      props.headerstatus === "scroll" ? "#8e94f2" : "#fd8e87"};
    transition: all 0.2s;
  }
`;

const StyleSignLink = styled.a`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => (props.headerstatus === "scroll" ? "#222" : "#fff")};
  border-left: 3px solid
    ${(props) => (props.headerstatus === "scroll" ? "#666" : "#fff")};
  width: 150px;
  padding: 0px 20px;
  cursor: ${(props) => (props.liveStatus ? "not-allowed" : "pointer")};

  :hover {
    color: ${(props) =>
      props.headerstatus === "scroll" ? "#8e94f2" : "#fd8e87"};
    transition: all 0.2s;
  }
`;

const StyleInvitationArea = styled.div`
  display: inline;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 3px solid
    ${(props) => (props.headerstatus === "scroll" ? "#666" : "#fff")};
  padding: 0px 40px;
  position: relative;
`;

const StyleNoNotification = styled.div`
  position: absolute;
  right: 25px;
  top: -1px;
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
  right: 25px;
  top: -1px;
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
  right: 25px;
  top: -12px;
  width: 30px;
  height: 30px;
  color: ${(props) => (props.headerstatus === "scroll" ? "red" : "#ffee32")};
  font-size: 1rem;
`;

const StylequestionArea = styled.div`
  position: absolute;
  right: 100px;
  top: 35px;
  width: 30px;
  height: 30px;
  line-height: 100px;
  display: inline-block;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: ${(props) =>
    props.headerstatus === "scroll"
      ? "url('/images/question-scroll.png')"
      : "url('/images/question-static.png')"};
`;

const Nav = ({ layer, headerStatus, currentUser }) => {
  const identityData = useSelector((state) => state.identityData);
  const invitationData = identityData.invitation;
  const identity = useSelector((state) => state.identity);
  const liveStatus = useSelector((state) => state.liveStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  return currentUser === null ? (
    <StyleNav layer={layer}>
      <StyleLink headerstatus={headerStatus} exact to="/">
        Home
      </StyleLink>
      <StyleSignLink
        headerstatus={headerStatus}
        onClick={() => dispatch(changeSignPage(true))}>
        Signin
      </StyleSignLink>
    </StyleNav>
  ) : (
    <StyleNav layer={layer}>
      {liveStatus ? (
        <>
          <StyleSignLink headerstatus={headerStatus} liveStatus={liveStatus}>
            Live
          </StyleSignLink>
          <StylequestionArea
            headerstatus={headerStatus}
            onClick={() => {
              dispatch(startRunGuide(true));
            }}
          />
        </>
      ) : (
        <>
          {identity === "student" ? (
            <>
              <StyleLink headerstatus={headerStatus} exact to="/">
                Home
              </StyleLink>
              <StyleLink headerstatus={headerStatus} to="/teachers">
                Teachers
              </StyleLink>
            </>
          ) : null}

          <StyleLink headerstatus={headerStatus} to="/live">
            Live
          </StyleLink>

          {identity === "student" ? (
            <>
              <StyleLink headerstatus={headerStatus} to="/profile/myresume">
                Profile
              </StyleLink>
              <StyleInvitationArea headerstatus={headerStatus}>
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
            </>
          ) : (
            <StyleLink headerstatus={headerStatus} to="/profile/myprofile">
              Profile
            </StyleLink>
          )}
        </>
      )}
    </StyleNav>
  );
};

export default Nav;
