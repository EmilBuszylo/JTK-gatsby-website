import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import HomePageTemplate from '../components/HomePageTemplate';

class HomePage extends Component {
  render() {
    const { frontmatter } = this.props.data.markdownRemark;
    const { pageContext } = this.props;

    const categories = pageContext.productCategories.filter(
      (category, index) => {
        let currentCategory = category.replace(' ', '-');

        return pageContext.productCategories.indexOf(currentCategory) == index;
      }
    );
    return (
      <HomePageTemplate
        title={frontmatter.title}
        meta_title={frontmatter.meta_title}
        meta_description={frontmatter.meta_description}
        description={frontmatter.description}
        offerings={frontmatter.offerings}
        bigImage={frontmatter.bigImage}
        slider_captions={frontmatter.slider_captions}
        hotProducts={pageContext.hotProducts}
        categories={categories}
      />
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        meta_title
        meta_description
        bigImage
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
`;
