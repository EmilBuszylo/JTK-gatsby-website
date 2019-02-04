import React, { Component } from 'react';

import ProducentsPageTemplate from '../components/ProducentsPageTemplate';

export default class ProducentsPage extends Component {
  render () {
    const { frontmatter, html } = this.props.data.markdownRemark

    return (
      <div>
        <ProducentsPageTemplate
          title={frontmatter.title}
          meta_description={frontmatter.meta_description}
          meta_title={frontmatter.meta_title}
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
