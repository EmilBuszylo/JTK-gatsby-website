import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import ServicePageTemplate from '../components/ServicePageTemplate'

const ServicePage = ({data}) => {
  const {markdownRemark: post} = data
  const { frontmatter } = data.markdownRemark
  return (
    <div>
      <Helmet>
        <title>{frontmatter.meta_title}</title>
        <meta name='description' content={frontmatter.meta_description} />
      </Helmet>
      <ServicePageTemplate
        title={frontmatter.title}
        contacts={frontmatter.contacts}
        threads={frontmatter.threads}
        content={post.html}
      />
    </div>
  )
}

ServicePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ServicePage

export const aboutPageQuery = graphql`
  query ServicePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
  }
`
