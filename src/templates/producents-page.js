import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import ProducentsPageTemplate from "../components/ProducentsPageTemplate";

const ProducentsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.meta_title}</title>
        <meta name="description" content={post.frontmatter.meta_description} />
      </Helmet>
      <ProducentsPageTemplate
        title={post.frontmatter.title}
        producents={post.frontmatter.producents}
        content={post.html}
        bigImage={post.frontmatter.bigImage}
      />
    </div>
  );
};

ProducentsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProducentsPage;

export const ProducentsPageQuery = graphql`
  query ProducentsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        meta_title
        meta_description
        bigImage {
          childImageSharp {
            fluid(maxWidth: 2200, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        producents {
          cover {
            childImageSharp {
              fluid(maxWidth: 270, quality: 85) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          description
          link
        }
      }
    }
  }
`;
