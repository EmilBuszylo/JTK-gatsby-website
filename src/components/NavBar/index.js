import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

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
`

const DropdownSubItem = styled(Link)`
  color: #fff !important;

  &:hover {
    background-color: ${props => props.theme.accentColor} !important;
    color: #ffffff;
    border-color: transparent;
  }
  @media (max-width: 1023px) {
    color: #4a4a4a !important;
  }
`

const NavbarItem = styled(Link)`
  color: #fff !important;
  &:hover {
      background-color: ${props => props.theme.accentColorHover} !important;
      color: #ffffff;
      border-color: transparent;
  }
  @media (max-width: 1023px) {
    color: #4a4a4a !important;
  }
`

const Dropdown = styled.div`
  background-color: ${props => props.theme.accentColorHover} !important;
  @media (max-width: 1024px) {
    background-color: #fff !important;
  }
`

const NavBar = () => {
  return (
    <nav className='navbar is-fixed-top' aria-label='main navigation' style={{backgroundColor: '#389ae5'}}>
      <section className='container  ' >
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            JT Klima logo
          </Link>
          <button className='button navbar-burger' data-target='navMenu'>
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className='navbar-menu' id='navMenu'>
          <div className='navbar-end'>
            <div className="navbar-item has-dropdown is-hoverable">
              <DropdownItem className='navbar-item'>
                Produkty
              </DropdownItem>
              <Dropdown className="navbar-dropdown">
                <DropdownSubItem className='navbar-item' to='/products'>
                  Katalog producentów
                </DropdownSubItem>
                <DropdownSubItem className='navbar-item' to='/products'>
                  Katalog wentylatorów
                </DropdownSubItem>
              </Dropdown>
            </div>
            <NavbarItem className='navbar-item' to='/firma'>
              O firmie
            </NavbarItem>
            <NavbarItem className='navbar-item' to='/uslugi'>
              Usługi
            </NavbarItem>
            <NavbarItem className='navbar-item' to='/blog'>
              Blog
            </NavbarItem>
            <NavbarItem className='navbar-item' to='/kontakt'>
              Kontakt
            </NavbarItem>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default NavBar
