import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import SearchBox from '../SearchBox';
import styled from 'styled-components';
import Logo from '../../../static/img/logo.png';

const NavBarWrapper = styled.nav`
  background-color: #389ae5 !important;
  z-index: 110 !important;
`;

const DropdownItem = styled.a`
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

const DropdownSubItem = styled(Link)`
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

const NavbarItem = styled(Link)`
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

const LogoItem = styled.img`
  max-height: 3rem !important;
`;

const Dropdown = styled.div`
  background-color: ${props => props.theme.accentColorHover} !important;
  @media (max-width: 1024px) {
    background-color: #fff !important;
  }
`;

const NavBar = ({ toggleNavbar, isActive }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <NavBarWrapper
        className="navbar is-fixed-top"
        aria-label="main navigation"
      >
        <section className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <LogoItem
                src={Logo}
                alt="JTLS, klimatyzacje, systemy chłodnicze"
              />
            </Link>
            <button
              className={`button navbar-burger ${isActive ? 'is-active' : ''}`}
              data-target="navMenu"
              onClick={toggleNavbar}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
            id="navMenu"
          >
            <div className="navbar-end">
              <SearchBox searchIndex={data.siteSearchIndex.index} />
              <div className="navbar-item has-dropdown is-hoverable">
                <DropdownItem className="navbar-item">Produkty</DropdownItem>
                <Dropdown className="navbar-dropdown">
                  <DropdownSubItem className="navbar-item" to="/producenci">
                    Producenci
                  </DropdownSubItem>
                  <DropdownSubItem className="navbar-item" to="/produkty">
                    Katalog klimatyzatorów
                  </DropdownSubItem>
                </Dropdown>
              </div>
              <NavbarItem className="navbar-item" to="/firma">
                O firmie
              </NavbarItem>
              <NavbarItem className="navbar-item" to="/uslugi">
                Usługi
              </NavbarItem>
              <NavbarItem className="navbar-item" to="/montaz">
                Montaż
              </NavbarItem>
              <NavbarItem className="navbar-item" to="/serwis">
                Serwis
              </NavbarItem>
              <NavbarItem className="navbar-item" to="/blog">
                Blog
              </NavbarItem>
              <NavbarItem className="navbar-item" to="/kontakt">
                Kontakt
              </NavbarItem>
            </div>
          </div>
        </section>
      </NavBarWrapper>
    )}
  />
);

export default NavBar;
