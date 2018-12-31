import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export class ContactPageTemplate extends Component {

  state = {
    topic: ''
  }

  onTopicChange = e => {
    const value = e.target.value

    if(value === 'product') {
      this.setState(prevState => ({topic: value}))
    }
  }

  render() {
    const {title, subtitle, meta_title, meta_description, products, threads, contacts} = this.props;

    return (
      <div>
        <Helmet>
          <title>{meta_title}</title>
          <meta name='description' content={meta_description} />
        </Helmet>
        <Hero title={title}/>
        <section className='section'>
          <div className='container'>
            <ContactForm products={products} topic={this.state.topic} onTopicChange={this.onTopicChange} threads={threads}/>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <div className="tags">
              {contacts.map(contact => {
                switch(contact.type) {
                  case 'mail':
                    return <a href={`mailto:${contact.contact}`}  className="tag is-info"><FontAwesomeIcon icon={faEnvelope} style={{marginRight: '.5em'}}/>{contact.contact}</a>
                  case 'phone':
                    return <a href={`tel:${contact.contact}`} className="tag is-info"><FontAwesomeIcon icon={faPhone} style={{marginRight: '.5em'}}/>{contact.contact}</a>
                }
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  contacts: PropTypes.array,
}

const ContactPage = ({data}) => {
  const {frontmatter} = data.markdownRemark;
  const {edges: products} = data.allMarkdownRemark;

  return (
    <ContactPageTemplate
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      meta_title={frontmatter.meta_title}
      meta_description={frontmatter.meta_description}
      contacts={frontmatter.contacts}
      products={products}
      threads={frontmatter.threads}
      contacts={frontmatter.contacts}
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
        subtitle
        meta_title
        meta_description
        heading
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
    	filter: {frontmatter: {templateKey: {eq: "product-page"}}}
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
