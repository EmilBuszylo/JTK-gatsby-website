import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import HomePageTemplate from "../components/HomePageTemplate";
import { HTMLContent } from "../components/Content";

class HomePage extends Component {
  render() {
    const { frontmatter } = this.props.data.markdownRemark;
    const { pageContext } = this.props;

    const categories = pageContext.productCategories.filter(
      (category, index) => {
        let currentCategory = category.replace(" ", "-");

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
        contentComponent={HTMLContent}
        welcomeSections={frontmatter.welcomeSections}
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
        bigImage {
          childImageSharp {
            fluid(maxWidth: 2200, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slider_captions {
          title
          caption
        }
        welcomeSections {
          sections {
            title
            subtitle
            buttonText
            buttonLink
            isExternal
            text
          }
        }
        offerings {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 320, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }
      }
    }
  }
`;
