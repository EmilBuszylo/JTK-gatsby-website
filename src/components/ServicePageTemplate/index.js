import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Hero from '../Hero'
import ContactForm from '../ContactForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

const Divider = styled.hr`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`

const TagsSection = styled.section`
  padding: 0 1.5rem 3rem 1.5rem;
`

export default class ServicePageTemplate extends Component {
  state = {
    topic: '',
  };

  onTopicChange = e => {
    const value = e.target.value

    if (value === 'product') {
      this.setState(prevState => ({ topic: value }))
    }
  };

  render () {
    const {
      title,
      products,
      threads,
      contacts,
      content,
    } = this.props

    return (
      <div>
        <Hero title={title} />
        <section className='section'>
          <div className='container'>
            <div
              className='content'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Divider />
          </div>
          <div className='container'>
            <ContactForm
              products={products}
              topic={this.state.topic}
              onTopicChange={this.onTopicChange}
              threads={threads}
            />
          </div>
        </section>
        <TagsSection>
          <div className='container'>
            <Divider />
            <div className='tags'>
              {contacts.map((contact, index) => {
                switch (contact.type) {
                  case 'mail':
                    return (
                      <a
                        key={contact.contact + index}
                        href={`mailto:${contact.contact}`}
                        className='tag is-info'
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ marginRight: '.5em' }}
                        />
                        {contact.contact}
                      </a>
                    )
                  case 'phone':
                    return (
                      <a
                        key={contact.contact + index}
                        href={`tel:${contact.contact}`}
                        className='tag is-info'
                      >
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ marginRight: '.5em' }}
                        />
                        {contact.contact}
                      </a>
                    )
                }
              })}
            </div>
          </div>
        </TagsSection>
      </div>
    )
  }
}

ServicePageTemplate.propTypes = {
  title: PropTypes.string,
  contacts: PropTypes.array,
}
