import React, {Component} from 'react'
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import Hero from '../Hero';
import ContactForm from '../ContactForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default class ContactPageTemplate extends Component {

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
    const {title, meta_title, meta_description, products, threads, contacts} = this.props;

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
              {contacts.map((contact, index) => {
                switch(contact.type) {
                  case 'mail':
                    return <a key={contact.contact + index} href={`mailto:${contact.contact}`}  className="tag is-info"><FontAwesomeIcon icon={faEnvelope} style={{marginRight: '.5em'}}/>{contact.contact}</a>
                  case 'phone':
                    return <a key={contact.contact + index} href={`tel:${contact.contact}`} className="tag is-info"><FontAwesomeIcon icon={faPhone} style={{marginRight: '.5em'}}/>{contact.contact}</a>
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
