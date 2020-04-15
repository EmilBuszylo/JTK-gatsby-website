import React from "react";
import "./styles.sass";
import PropTypes from "prop-types";
import Carousel from "react-light-carousel";
import styled from "styled-components";

const Back = () => <span className="is-size-4">{"◀"}</span>;
const Next = () => <span className="is-size-4">{"▶"}</span>;

const SliderWrapper = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

const TextSlider = ({ config }) => {
  return (
    <React.Fragment>
      <SliderWrapper>
        <Carousel
          autoplay
          infinite
          showControls
          prevBtn={<Back />}
          nextBtn={<Next />}
        >
          {config.elements.map((element, index) => (
            <span key={element.title + index}>
              <h2 className="title is-3 is-spaced">{element.title}</h2>
              <p className="subtitle is-5 is-spaced">{element.caption}</p>
            </span>
          ))}
        </Carousel>
      </SliderWrapper>
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
