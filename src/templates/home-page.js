import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Offerings from '../components/Offerings';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoriesBars from '../components/CategoryBars';

const arrayWithProductProps = (products, property ) => {
  return products.filter(product => product.node.frontmatter.categories)
  .map((product, index) => product.node.frontmatter.categories)
  .reduce((a,b) => {
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[])
}

export const HomePageTemplate = ({
  title,
  heading,
  description,
  offerings,
  meta_title,
  meta_description,
  products,
  slider_captions
}) => (
  <div>
    <Helmet>
      <title>{meta_title}</title>
      <meta name='description' content={meta_description} />
    </Helmet>
    <Hero
      title={title}
      large={true}
      carousel={{
        isSlider: true,
        elements: slider_captions
      }}/>
    <section className='section'>
      <div className='container hot-products-container' style={{padding: '3rem 0'}}>
        <ProductCard products={products} isHot={true}/>
      </div>
    </section>
    <section className='section' style={{backgroundColor: '#dbe0e4'}}>
      <Offerings gridItems={offerings.blurbs}/>
    </section>
    <CategoriesBars categories={arrayWithProductProps(products,'categories')} />
  </div>
)

HomePageTemplate.propTypes = {
  title: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  offerings: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  slider_captions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      caption: PropTypes.string.isRequired
    })
  ),
}

const HomePage = ({data}) => {
  const {frontmatter} = data.markdownRemark
  const {edges: products} = data.allMarkdownRemark

  return (
    <HomePageTemplate
      title={frontmatter.title}
      meta_title={frontmatter.meta_title}
      meta_description={frontmatter.meta_description}
      heading={frontmatter.heading}
      description={frontmatter.description}
      offerings={frontmatter.offerings}
      products={products}
      slider_captions={frontmatter.slider_captions}
    />
  )
}

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default HomePage

export const pageQuery = graphql`
  query IndexPage($id: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    	filter: {frontmatter: {templateKey: {eq: "product-page"}}}
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          id
          fields {
            slug
          }
          frontmatter {
            title
            cover
            templateKey
            hotProductsSelect
            amount
            categories
            date(formatString: "MM.DD.YYYY")
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        meta_title
        meta_description
        heading
        description
        offerings {
          blurbs {
            image
            text
          }
        }
        slider_captions {
          title
          caption
        }
      }

    }
  }
`
