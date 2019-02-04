import React from 'react';
import Helmet from 'react-helmet';
import Offerings from '../Offerings';
import PropTypes from 'prop-types';
import Hero from '../Hero';
import CategoriesBars from '../CategoryBars';
import ProductCard from '../ProductCard';

const HomePageTemplate = ({
  title,
  offerings,
  meta_title,
  meta_description,
  slider_captions,
  hotProducts,
  categories,
}) => (
  <div>
    <Helmet>
      <title>{meta_title}</title>
      <meta name='description' content={meta_description} />
    </Helmet>
    <Hero
      title={title}
      large
      carousel={{
        isSlider: true,
        elements: slider_captions,
      }}
    />
    <section className='section'>
      <div
        className='container hot-products-container'
        style={{ padding: '3rem 0' }}
      >
        <ProductCard products={hotProducts} isHot />
      </div>
    </section>
    <section className='section' style={{ backgroundColor: '#dbe0e4' }}>
      <Offerings gridItems={offerings.blurbs} />
    </section>
    <CategoriesBars categories={categories} />
  </div>
)

HomePageTemplate.propTypes = {
  title: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  offerings: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  categories: PropTypes.array,
  hotProducts: PropTypes.array,
}

export default HomePageTemplate
