import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components';
import 'react-image-lightbox/style.css';

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import './styles.sass'
import config from '../../meta/config'

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

const TemplateWrapper = ({children}) => (
  <ThemeProvider theme={theme}>
    <PageLayout className="page-layout">
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta name='description' content={config.siteDescription} />
      </Helmet>
      <NavBar />
      <PageContent>{children()}</PageContent>
      <Footer title={config.siteTitle} slug={config.siteUrl} excerpt={config.siteDescription}/>
    </PageLayout>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
