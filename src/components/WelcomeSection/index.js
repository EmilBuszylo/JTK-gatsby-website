import React from "react";
import PropTypes from "prop-types";

import {
  LinkButton,
  GatsbyLinkButton,
  Divider,
  SectionContent,
} from "./styled";

export const WelcomeSection = ({ section }) => {
  return (
    <>
      <section className="section">
        <div className="container has-text-centered">
          <h3 className="title is-2 ">{section.title}</h3>
          {section.subtitle && (
            <span className="subtitle is-5 is-spaced">{section.subtitle}</span>
          )}
          <SectionContent className="content" md={section.text} />
          {section.isExternal ? (
            <LinkButton
              className="button is-rounded has-text-centered"
              href={section.buttonLink}
            >
              {section.buttonText}
            </LinkButton>
          ) : (
            <GatsbyLinkButton
              className="button is-rounded has-text-centered"
              to={section.buttonLink.replace("https://jtlsklima.pl/", "")}
            >
              {section.buttonText}
            </GatsbyLinkButton>
          )}
        </div>
      </section>
      <Divider />
    </>
  );
};

WelcomeSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    buttonLink: PropTypes.string.isRequired,
    text: PropTypes.string,
    isExternal: PropTypes.bool.isRequired,
  }).isRequired,
};
