import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  background-color: #fafafa;
  padding: 3rem 1.5rem 3rem;
  border-top: 0.05em solid rgba(0, 0, 0, 0.1);
  display: block;
  position: relative;
`

const Navbar = styled.div`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  text-align: right;
  justify-content: flex-end;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <div className='container'>
        <Navbar>
          <div className='navbar-end'>
            <Link className='navbar-item' to='/rodo'>
              RODO
            </Link>
            <Link className='navbar-item' to='/polityka-prywatnosci'>
              Polityka Prywatności
            </Link>
          </div>
        </Navbar>
      </div>
    </FooterWrapper>
  )
}

export default Footer
