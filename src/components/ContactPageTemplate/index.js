import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import { Divider, TagsSection } from "./styled";
import Hero from "../Hero";
import ContactForm from "../ContactForm";
import Content from "../Content";

export default class ContactPageTemplate extends Component {
  state = {
    topic: "",
  };

  onTopicChange = e => {
    const value = e.target.value;

    if (value === "product") {
      this.setState(prevState => ({ topic: value }));
    }
  };

  render() {
    const {
      title,
      meta_title,
      meta_description,
      products,
      threads,
      contacts,
      body,
      contentComponent,
      bigImage,
    } = this.props;

    const PageContent = contentComponent || Content;

    return (
      <div>
        <Helmet>
          <title>{meta_title}</title>
          <meta name="description" content={meta_description} />
        </Helmet>
        <Hero title={title} bigImage={bigImage} />
        <section className="section">
          <div className="container">
            <PageContent className="content" content={body} />
            {body && <Divider />}
          </div>
          <div className="container">
            <ContactForm
              products={products}
              topic={this.state.topic}
              onTopicChange={this.onTopicChange}
              threads={threads}
              page="kontakt"
            />
          </div>
        </section>
        <TagsSection>
          <div className="container">
            <Divider />
            <div className="tags">
              {contacts.map((contact, index) => {
                switch (contact.type) {
                  case "mail":
                    return (
                      <a
                        key={contact.contact + index}
                        href={`mailto:${contact.contact}`}
                        className="tag is-info"
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ marginRight: ".5em" }}
                        />
                        {contact.contact}
                      </a>
                    );
                  case "phone":
                    return (
                      <a
                        key={contact.contact + index}
                        href={`tel:${contact.contact}`}
                        className="tag is-info"
                      >
                        <FontAwesomeIcon
                          icon={faPhone}
                          style={{ marginRight: ".5em" }}
                        />
                        {contact.contact}
                      </a>
                    );
                }
              })}
            </div>
          </div>
        </TagsSection>
      </div>
    );
  }
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  contacts: PropTypes.array,
  body: PropTypes.string,
  contentComponent: PropTypes.func,
  bigImage: PropTypes.string,
};
