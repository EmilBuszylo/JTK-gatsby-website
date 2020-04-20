import styled, { css } from "styled-components";
import GatsbyImage from "gatsby-image";
import { MdContent } from "../MdContent";
import { Link } from "gatsby";

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: ${props => (props.revers ? "column-reverse" : "column")};
  background-color: #fff;

  @media (min-width: 640px) {
    flex-direction: ${props => (props.revers ? "row-reverse" : "row")};
  }
`;

export const WhiteBox = styled.div`
  width: 100%;
  flex: 0 0 1;
  padding: 1em;
  height: 45vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;

  @media (min-width: 640px) {
    width: 50%;
    flex: 0 0 50%;
  }
`;

export const ImageBoxWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 45vh;
  min-height: 380px;
  flex: 0 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;

  @media (min-width: 640px) {
    width: 50%;
    flex: 0 0 50%;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
`;

export const ImageBox = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  position: absolute !important;
`;

export const BoxText = styled(MdContent)`
  z-index: 2;
  color: ${props => props.color || "#fff"};
  text-align: center;
  line-height: 1.7;
  font-size: 1.1em;
`;

const commonButtonStyles = css`
  text-align: center;
  margin-bottom: 1rem;
  transition: all 0.1s linear;
  z-index: 2;
  background-color: transparent !important;
`;

export const LinkButton = styled.a`
  color: ${props => props.color || "#fff"}!important;
  ${commonButtonStyles}

  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: ${props =>
      props.hoverColor ? props.hoverColor : "#fff"} !important;
    border-color: transparent;
  }
`;

export const GatsbyLinkButton = styled(Link)`
  color: ${props => props.color || "#fff"}!important;
  ${commonButtonStyles}

  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: ${props =>
      props.hoverColor ? props.hoverColor : "#fff"} !important;
    border-color: transparent;
  }
`;
