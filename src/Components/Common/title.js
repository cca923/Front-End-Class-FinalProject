import styled from "styled-components";

const StyleSubtitle = styled.div`
  position: absolute;
  background-color: #9092db;
  box-shadow: rgba(0, 0, 225, 0.35) 0px -50px 36px -28px inset;
  padding: 15px;
  border-radius: 25px;
  top: 5px;
  left: 30px;
  width: 250px;
  font-size: 1.2rem;
  text-align: center;
  color: #fff;

  @media only screen and (max-width: 600px) {
    width: 200px;
    font-size: 1.1rem;
    line-height: 1rem;
    top: 8px;
  }
`;

export { StyleSubtitle };
