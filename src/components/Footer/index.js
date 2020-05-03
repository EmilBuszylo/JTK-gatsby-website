import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const FooterWrapper = styled.footer`
  background-color: #fafafa;
  padding: 3rem 1.5rem 3rem;
  border-top: 0.05em solid rgba(0, 0, 0, 0.1);
  display: block;
  position: relative;
`;

const Navbar = styled.div`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  text-align: right;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const NavLinksGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const LeftIcon = styled.span`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.1em;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <Navbar>
          <NavLinksGroup>
            <a className="navbar-item" href="tel:48 883 779 380">
              <LeftIcon>
                <FontAwesomeIcon icon={faPhone} />
              </LeftIcon>
              +48 883 779 380
            </a>

            <a className="navbar-item" href="mailto:biuro@jtlsklima.pl">
              <LeftIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </LeftIcon>
              biuro@jtlsklima.pl
            </a>
          </NavLinksGroup>
          <NavLinksGroup>
            <Link className="navbar-item" to="/rodo">
              RODO
            </Link>
            <Link className="navbar-item" to="/polityka-prywatnosci">
              Polityka Prywatności
            </Link>
          </NavLinksGroup>
        </Navbar>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
