import styled from "styled-components";
import { MdContent } from "../MdContent";

export const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  margin: 2rem auto;
  max-width: 60em;
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 2em;

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const FeaturedImageWrapper = styled.div`
  margin-right: 2rem;
  width: 30%;
  position: relative;
  overflow: hidden;
  @media (max-width: 640px) {
    margin-right: 0;
    width: 100%;
    height: 15rem;
    margin-bottom: 1rem;
  }
`;

export const FeaturedImage = styled.img`
  position: absolute;
  width: auto;
  height: 100%;
  max-width: none;
  top: 50%;
  left: 50%;
  transition: transform 1s ease-in-out;
  transform: translate(-50%, -50%);
  @media (max-width: 640px) {
    width: 100%;
    min-height: 100%;
  }
`;

export const CardContent = styled.div`
  width: 65%;
  @media (max-width: 640px) {
    width: 100%;
    text-align: center;
  }
`;

export const CardDescription = styled(MdContent)`
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-y: auto;
  height: 7rem;

  p {
    margin: 0 !important;
  }
  @media (max-width: 640px) {
    height: 9rem;
    text-align: left;
  }
`;

export const LinkButton = styled.a`
  background-color: ${props => props.theme.accentColor} !important;
  text-align: center;
  border-color: transparent;
  color: #fff !important;
  margin-bottom: 1rem;
  transition: all 0.1s linear;

  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff;
    border-color: transparent;
  }

  @media (max-width: 640px) {
    margin-top: 1rem;
  }
`;
