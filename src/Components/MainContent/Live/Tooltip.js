import React from "react";
import styled from "styled-components";

import { StylePurpleButton, StyleWhiteButton } from "../../Common/button";

const TooltipBody = styled.div`
  height: fit-content;
  width: 100%;
  background-color: #fff;
  padding: 25px 15px 15px 15px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TooltipTitle = styled.div`
  text-align: center;
  border-bottom: 2px solid #7367f0;
  padding-bottom: 8px;
  color: #343434;

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const TooltipContent = styled.div`
  min-height: 100px;
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    min-height: 80px;
    padding: 15px;
  }
`;

const TooltipFooter = styled.div`
  margin-top: auto;
  display: flex;
  min-width: 400px;

  @media only screen and (max-width: 600px) {
    min-width: 300px;
  }
`;

const StyleSkipButton = styled.span`
  cursor: pointer;
  padding: 0;
  margin: auto auto 0 0;
  color: #999999;
  height: fit-content;
  font-size: 0.9rem;

  &:hover {
    color: #e63946;
  }
`;

const StylePrimaryButton = styled(StylePurpleButton)`
  width: 120px;
  font-size: 0.9rem;
  margin-left: 10px;
  height: 36px;

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
    width: 100px;
    height: 30px;
    margin-top: auto;
    line-height: 32px;
  }
`;

const StyleBackButton = styled(StyleWhiteButton)`
  width: 120px;
  font-size: 0.9rem;
  height: 36px;

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
    width: 100px;
    height: 30px;
    margin-top: auto;
    line-height: 32px;
  }
`;

const StyleCloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  align-content: center;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: url("/images/close.png");

  &:hover {
    background-image: url("/images/close-hover.png");
  }
`;

const FormattedMessage = styled.div``;

const Tooltip = ({
  continuous,
  index,
  step,
  skipProps,
  backProps,
  closeProps,
  primaryProps,
  isLastStep,
  tooltipProps,
}) => {
  return (
    <TooltipBody {...tooltipProps}>
      {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
      <TooltipContent>{step.content}</TooltipContent>
      <TooltipFooter>
        <StyleSkipButton {...skipProps}>Skip</StyleSkipButton>
        {index > 0 && (
          <StyleBackButton {...backProps}>
            <FormattedMessage id="back" />
            Before｜上一步
          </StyleBackButton>
        )}
        {continuous && (
          <StylePrimaryButton {...primaryProps}>
            <FormattedMessage id="next" />
            {isLastStep ? "End｜結束" : "Next｜下一步"}
          </StylePrimaryButton>
        )}
      </TooltipFooter>

      {continuous && (
        <StyleCloseButton {...closeProps}>
          <FormattedMessage id="close" />
        </StyleCloseButton>
      )}
    </TooltipBody>
  );
};

export default Tooltip;
