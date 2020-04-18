import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ContactPageTemplate from "../components/ContactPageTemplate";
import { HTMLContent } from "../components/Content";

const ContactPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { edges: products } = data.allMarkdownRemark;

  return (
    <ContactPageTemplate
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      meta_description={frontmatter.meta_description}
      contacts={frontmatter.contacts}
      products={products}
      threads={frontmatter.threads}
      body={html}
      contentComponent={HTMLContent}
      bigImage={frontmatter.bigImage}
    />
  );
};

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
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
        threads {
          thread
        }
        contacts {
          contact
          type
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "product-page" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
