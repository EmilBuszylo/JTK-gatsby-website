import styled from "styled-components";
import { Link } from "gatsby";

export const NavBarWrapper = styled.nav`
  background-color: #389ae5 !important;
  z-index: 110 !important;
`;

export const Container = styled.section`
  max-width: 100% !important;
  width: 100%;
  padding: 0 2rem;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1320px) {
    justify-content: center;
  }
  @media (max-width: 1023px) {
    padding: 0;
  }
`;

export const NavbarBand = styled.div`
  align-items: center !important;
  padding: 0 1rem;
`;

export const NavbarEnd = styled.div`
  @media (max-width: 1320px) {
    margin-left: 0 !important;
  }
`;

export const NavbarMenu = styled.div`
  @media (max-width: 1320px) {
    justify-content: center;
  }
`;

export const NavbarLink = styled.a`
  color: #fff !important;
  border-color: transparent;
  @media (max-width: 1023px) {
    display: none !important;
  }
  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff;
    border-color: transparent;
  }
`;

export const DropdownItem = styled.a`
  color: #fff !important;

  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff;
    border-color: transparent;
  }
  @media (max-width: 1023px) {
    color: #4a4a4a !important;
  }
`;

export const DropdownSubItem = styled(Link)`
  color: #fff !important;

  &:hover {
    background-color: ${props => props.theme.accentColor} !important;
    color: #ffffff;
    border-color: transparent;
  }

  &:focus {
    background-color: ${props => props.theme.accentColor} !important;
    color: #ffffff !important;
    border-color: transparent !important;
  }
  @media (max-width: 1023px) {
    color: #4a4a4a !important;
  }
`;

export const NavbarItem = styled(Link)`
  color: #fff !important;
  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff;
    border-color: transparent;
  }
  &:focus {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff !important;
    border-color: transparent !important;
  }
  @media (max-width: 1023px) {
    color: #4a4a4a !important;
  }
`;

export const LogoItem = styled.img`
  max-height: 4.5rem !important;
`;

export const Dropdown = styled.div`
  background-color: ${props => props.theme.accentColorHover} !important;
  @media (max-width: 1024px) {
    background-color: #fff !important;
  }
`;

export const MobileContactWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 1023px) {
    display: none !important;
  }
`;

export const ContactElement = styled.a`
  margin: 0.4em 1em;
  font-size: 0.9em !important;
`;
