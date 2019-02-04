import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/sass/styles.sass';
import config from '../../data/config';
import 'react-image-lightbox/style.css';

const theme = {
  accentColor: '#389ae5',
  accentColorHover: '#4ba4e7',
  greyAccent: '#dbe0e4',
}

const PageContent = styled.div`
  min-height: 85vh;
`

const PageLayout = styled.div`
  position: relative;
`

class TemplateWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { isActive: false }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar () {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <PageLayout>
          <Helmet>
            <title>{config.siteTitle}</title>
            <meta name='description' content={config.siteDescription} />
          </Helmet>
          <NavBar
            isActive={this.state.isActive}
            toggleNavbar={() => this.toggleNavbar()}
          />
          <PageContent>{this.props.children}</PageContent>
          <Footer />
        </PageLayout>
      </ThemeProvider>
    )
  }
}

export default TemplateWrapper
