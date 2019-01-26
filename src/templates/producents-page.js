import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProducentsPageTemplate from '../components/ProducentsPageTemplate'
import Helmet from 'react-helmet';

export default class ProducentsPage extends Component {

  render () {
    const {frontmatter, html} = this.props.data.markdownRemark;

    return (
      <div>
        <Helmet>
          <title>Producenci</title>
        </Helmet>
        <ProducentsPageTemplate
            title={frontmatter.title}
            producents={frontmatter.producents}
            content={html}
        />
      </div>
    )
  }
}

export const ProducentsPageQuery = graphql`
  query ProducentsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        meta_title
        meta_description
        producents {
            cover
            name
            description
            link
        }
      }
    }
  }
`
