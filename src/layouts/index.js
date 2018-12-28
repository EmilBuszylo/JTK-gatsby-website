/**
 * Created by vaibhav on 31/3/18
 */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import './styles.sass'
import config from '../../meta/config'

const theme = {
  accentColor: '#389ae5',
  accentColorHover: '#4ba4e7',
  greyAccent: '#dbe0e4',
}

const TemplateWrapper = ({children}) => (
  <ThemeProvider theme={theme}>
    <div className="page-layout">
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name='description' content={config.siteDescription} />
      </Helmet>
      <NavBar />
      <div>{children()}</div>
      <Footer />
    </div>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
