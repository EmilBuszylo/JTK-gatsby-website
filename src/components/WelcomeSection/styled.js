import styled from "styled-components";
import { MdContent } from "../MdContent";
import { Link } from "gatsby";

export const GatsbyLinkButton = styled(Link)`
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
`;

export const Divider = styled.hr`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 !important;
`;

export const SectionContent = styled(MdContent)`
  margin: 2em 0 !important;
`;
