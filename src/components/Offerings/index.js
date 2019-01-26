import React from 'react';
import PropTypes from 'prop-types';

const Offerings = ({ gridItems }) => (
  <div className='container hot-products-container'>
    {gridItems.map((item, index) => (
      <div className='section' key={item.text + index}>
        <div className="columns is-tablet is-centered">
          <div className="column is-three-quarters-desktop">
            <p className="content">{item.text}</p>
          </div>
          <div className="column">
            <img alt='' src={item.image} />
          </div>
        </div>
      </div>
    ))}
</div>
)

Offerings.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default Offerings;
