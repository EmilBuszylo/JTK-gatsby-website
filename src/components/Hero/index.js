import React from "react";
import PropTypes from "prop-types";

import { HeroPlace, HeroBody, Overlay } from "./styled";
import Carousel from "../TextSlider";

import background from "../../../static/img/architektura.jpg";

const Hero = ({ title, large, carousel, bigImage }) => {
  const isImageSharp =
    bigImage && bigImage.childImageSharp && bigImage.childImageSharp.fluid.src;
  if (background) {
    return (
      <HeroPlace
        className={`hero is-info has-bg-image ${
          large ? "is-large" : "is-medium"
        }`}
        style={{
          background: `url('${isImageSharp || background}') center bottom`,
          backgroundSize: "cover",
          position: "relative",
          zIndex: "0",
        }}
      >
        <HeroBody className="hero-body" style={{ zIndex: "2" }}>
          <div className="container has-text-centered">
            {carousel.isSlider ? (
              <div className="container container__slider">
                <Carousel config={carousel} />
              </div>
            ) : (
              <h1 className="title is-1">{title}</h1>
            )}
          </div>
        </HeroBody>
        <Overlay />
      </HeroPlace>
    );
  }
  return null;
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
  carousel: PropTypes.shape({
    isSlider: PropTypes.bool.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        caption: PropTypes.string.isRequired,
      })
    ),
  }),
  bigImage: PropTypes.string,
};

Hero.defaultProps = {
  large: false,
  carousel: {
    isSlider: false,
    elements: [],
  },
};

export default Hero;
