import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'
import Content, {HTMLContent} from '../components/Content'

export const ServicesPageTemplate = ({title, content, contentComponent}) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <Hero title={title}/>
      <section className='section section--gradient'>
        <div className='container'>
          <div className='columns'>
            <div className='column is-10 is-offset-1'>
              <div className='section'>
                <PageContent className='content' content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ServicesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ServicesPage = ({data}) => {
  const {markdownRemark: post} = data

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.meta_title}</title>
        <meta name='description' content={post.frontmatter.meta_description} />
      </Helmet>
      <ServicesPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </div>
  )
}

ServicesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ServicesPage

export const servicesPageQuery = graphql`
  query ServicesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        meta_title
        meta_description
      }
    }
  }
`
