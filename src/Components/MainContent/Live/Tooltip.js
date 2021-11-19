import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
`;

const TooltipContent = styled.div`
  min-height: 100px;
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
`;

const TooltipFooter = styled.div`
  margin-top: auto;
  display: flex;
  min-width: 400px;
`;

const StyleSkipButton = styled.span`
  cursor: pointer;
  padding: 0;
  margin: auto auto 0 0;
  color: #999999;
  height: fit-content;
  font-size: 0.9rem;
`;

const StylePrimaryButton = styled.button`
  width: 120px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;
  padding: 8px;
  margin-left: 10px;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleBackButton = styled.button`
  width: 120px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;
  padding: 8px;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
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
