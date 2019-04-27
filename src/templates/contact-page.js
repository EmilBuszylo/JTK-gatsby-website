import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ContactPageTemplate from '../components/ContactPageTemplate'

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges: products } = data.allMarkdownRemark

  return (
    <ContactPageTemplate
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      meta_description={frontmatter.meta_description}
      contacts={frontmatter.contacts}
      products={products}
      threads={frontmatter.threads}
    />
  )
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        meta_title
        meta_description
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
`
