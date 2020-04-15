import styled from "styled-components";

export const HeroPlace = styled.div`
  min-height: 30vh;
  margin-top: 2em;
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

export const HeroBody = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 640px) {
    display: block;
  }
`;

export const Overlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;
