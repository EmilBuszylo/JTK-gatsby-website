import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { HTMLContent } from "../components/Content";
import AboutPageTemplate from "../components/AboutPageTemplate";

const ProducentsPage = ({ data }) => {
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
        content=""
      />
    </div>
  );
};

ProducentsPage.propTypes = {
  data: PropTypes.object.isRequired
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
        producents {
          cover
          name
          description
          link
        }
      }
    }
  }
`;
