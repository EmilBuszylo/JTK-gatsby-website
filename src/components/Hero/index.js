import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Carousel from '../TextSlider';

import background from '../../../static/img/architektura.jpg';
import { width } from 'window-size';

const Overlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  zIndex: 1;
  background: rgba(0,0,0,.4);
`

const Hero = ({title, large, carousel}) => {
  if(background) {
    console.log(background)

    return (
      <section className={`hero is-info has-bg-image ${large ? 'is-large' : 'is-medium'}`}
        style={{ background: `url('${background}') center bottom`, backgroundSize: 'cover', position: 'relative', zIndex: '0' }}
      >
        <div className='hero-body' style={{zIndex: '2'}}>
          <div className='container has-text-centered'>
          {carousel.isSlider ?
            <div className='container container__slider'>
              <Carousel config={carousel}/>
            </div>
            :
            <h1 className='title is-1'>
              {title}
            </h1>
          }
          </div>
        </div>
        <Overlay />
      </section>
    )
  }
  return null
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
  carousel: PropTypes.shape({
    isSlider: PropTypes.bool.isRequired,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        caption: PropTypes.string.isRequired
      })
    )
  })
}

Hero.defaultProps = {
  large: false,
  carousel: {
    isSlider: false,
    elements: []
  }
}

export default Hero;
