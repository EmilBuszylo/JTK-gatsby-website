import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { HTMLContent } from "../components/Content";
import AboutPageTemplate from "../components/AboutPageTemplate";

const AssemblyPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.meta_title}</title>
        <meta name="description" content={post.frontmatter.meta_description} />
      </Helmet>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        bigImage={post.frontmatter.bigImage}
      />
    </div>
  );
};

AssemblyPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AssemblyPage;

export const aboutPageQuery = graphql`
  query AssemblyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
      }
    }
  }
`;
