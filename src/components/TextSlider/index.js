import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Carousel from "nuka-carousel";

const TextSlider = ({ config }) => {
  var settings = {
    slidesToShow: 1,
    slidesToScroll: "auto",
    cellAlign: "center",
    transitionMode: "scroll",
    heightMode: "max",
    withoutControls: false,
    slideIndex: 0,
    wrapAround: true,
    autoplay: true,
    autoplayInterval: 5000,
    renderBottomCenterControls: null,
  };

  return (
    <React.Fragment>
      <Carousel
        {...settings}
        renderCenterLeftControls={({ previousSlide }) => (
          <CarouselControl onClick={previousSlide}>{"◀"}</CarouselControl>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <CarouselControl onClick={nextSlide}>{"▶"}</CarouselControl>
        )}
      >
        {config.elements.map((element, index) => (
          <div key={element.title + index}>
            <Title>{element.title}</Title>
            <SliderText>{element.caption}</SliderText>
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  );
};

TextSlider.propTypes = {
  config: PropTypes.shape({
    isSlider: PropTypes.bool.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        caption: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default TextSlider;

const CarouselControl = styled.button`
  font-size: 1.5em;
  cursor: pointer;
  color: #fff;
  background: none;
  border: none;
  outline: none;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #fff;
  font-weight: bold;

  @media (min-width: 640px) {
    font-size: 2.5em;
    margin-bottom: 1.5em;
  }
`;

const SliderText = styled.p`
  font-size: 0.9em;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 1.5em;
  }
`;
