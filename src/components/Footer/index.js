import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #fafafa;
  padding: 3rem 1.5rem 6rem;
  border-top: 0.05em solid rgba(0, 0, 0, 0.1);
  display: block;
  position: relative;
`;
const Footer = () => {
  return (
    <FooterWrapper className="footer">
      <div className="container">
        <div className="has-text-right navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/rodo">
              RODO
            </Link>
            <Link className="navbar-item" to="/polityka-prywatnosci">
              Polityka Prywatności
            </Link>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
