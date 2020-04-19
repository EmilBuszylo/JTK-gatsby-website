import React from "react";
import Content from "../Content";
import PropTypes from "prop-types";
import Hero from "../Hero";

const AboutPageTemplate = ({ title, content, contentComponent, bigImage }) => {
  const PageContent = contentComponent || Content;
  return (
    <div>
      <Hero title={title} bigImage={bigImage} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

export default AboutPageTemplate;
