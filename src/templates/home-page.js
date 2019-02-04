import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HomePageTemplate from '../components/HomePageTemplate';

class HomePage extends Component {
  render () {
    const { frontmatter } = this.props.data.markdownRemark
    const { pageContext } = this.props
    return (
      <HomePageTemplate
        title={frontmatter.title}
        meta_title={frontmatter.meta_title}
        meta_description={frontmatter.meta_description}
        description={frontmatter.description}
        offerings={frontmatter.offerings}
        slider_captions={frontmatter.slider_captions}
        hotProducts={pageContext.hotProducts}
        categories={pageContext.productCategories}
      />
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default HomePage

export const pageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        meta_title
        meta_description
        slider_captions {
          title
          caption
        }
        offerings {
          blurbs {
            image
            text
          }
        }
      }
    }
  }
`
