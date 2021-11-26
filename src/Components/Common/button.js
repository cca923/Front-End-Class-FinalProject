import styled from "styled-components";

const StylePurpleButton = styled.div`
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  line-height: 38px;
  color: #fff;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleWhiteButton = styled.div`
  width: 150px;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: rgb(72, 76, 122);
  font-weight: 600;
  font-size: 1rem;
  line-height: 38px;
  text-align: center;
  border-radius: 50px;
  background-image: linear-gradient(180deg, #fff, #f5f5fa);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

const StyleEditResumeButton = styled.img`
  width: 50px;
  padding: 8px;
  background-size: 50%;
  border-radius: 15px;
  position: fixed;
  position: absolute;
  right: 0%;
  bottom: 0%;
  z-index: 1000;

  outline: 0;
  border: 0;
  cursor: pointer;
  background-image: linear-gradient(180deg, #7c8aff, #3c4fe0);
  box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
    0 1px 3px 0 rgb(93 100 148 / 20%);
  transition: all 0.2s ease-out;

  :hover {
    box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%),
      0 4px 6px 0 rgb(93 100 148 / 20%);
  }
`;

export { StylePurpleButton, StyleWhiteButton, StyleEditResumeButton };
