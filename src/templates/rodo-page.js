import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { HTMLContent } from "../components/Content";
import AboutPageTemplate from "../components/AboutPageTemplate";

const RodoPage = ({ data }) => {
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
      />
    </div>
  );
};

RodoPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default RodoPage;

export const rodoPageQuery = graphql`
  query RodoPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        meta_title
        meta_description
      }
    }
  }
`;
