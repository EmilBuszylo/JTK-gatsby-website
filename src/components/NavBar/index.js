import React, {Component, Fragment} from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  background-color: #389ae5 !important;
  z-index: 110 !important;
`

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

const NavBtn = styled.button`
  &:focus,
  &:active {
    background: #fff !important;
  }
`

const Overlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.4);
  z-index: 100;
`

export default class NavBar extends Component {

  state = {
    openMenu: false
  }

  onToggleMenu = () => {
    this.setState(prevState => ({openMenu: !this.state.openMenu}))
  }

  render(){
    const {openMenu} = this.state;

    return (
      <Fragment>
        <NavBarWrapper className='navbar is-fixed-top' aria-label='main navigation'>
          <section className='container  ' >
            <div className='navbar-brand'>
              <Link to='/' className='navbar-item'>
                JT Klima logo
              </Link>
              <NavBtn className={`button navbar-burger ${openMenu ? 'is-active' : ''}`} data-target='navMenu' onClick={() => this.onToggleMenu()}>
                <span />
                <span />
                <span />
              </NavBtn>
            </div>
            <div className={`navbar-menu ${openMenu ? 'is-active' : ''}`} id='navMenu'>
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
        </NavBarWrapper>
        {openMenu ? <Overlay onClick={() => this.onToggleMenu()}/> : null}
      </Fragment>
    )
  }
}
