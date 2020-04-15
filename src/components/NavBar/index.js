import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import SearchBox from "../SearchBox";
import Logo from "../../../static/img/logo.png";
import {
  NavBarWrapper,
  Container,
  NavbarBand,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  LogoItem,
  Dropdown,
  DropdownItem,
  DropdownSubItem,
} from "./styled";

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
        <Container className="container">
          <NavbarBand className="navbar-brand">
            <Link to="/" className="navbar-item">
              <LogoItem
                src={Logo}
                alt="JTLS, klimatyzacje, systemy chłodnicze"
              />
            </Link>
            <NavbarLink className="navbar-item" href="tel:+48883779380">
              +48 883 779 380
            </NavbarLink>
            <NavbarLink
              className="navbar-item"
              href="mailto:biuro@jtlsklima.pl"
            >
              biuro@jtlsklima.pl
            </NavbarLink>
            <button
              className={`button navbar-burger ${isActive ? "is-active" : ""}`}
              data-target="navMenu"
              onClick={toggleNavbar}
            >
              <span />
              <span />
              <span />
            </button>
          </NavbarBand>
          <NavbarMenu
            className={`navbar-menu ${isActive ? "is-active" : ""}`}
            id="navMenu"
          >
            <NavbarEnd className="navbar-end">
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
            </NavbarEnd>
          </NavbarMenu>
        </Container>
      </NavBarWrapper>
    )}
  />
);

export default NavBar;
