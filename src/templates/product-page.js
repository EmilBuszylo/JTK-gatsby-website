/**
 * Created by vaibhav on 31/3/18
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Link from 'gatsby-link'
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';

import Content, {HTMLContent} from '../components/Content'
import SE0 from '../components/SEO'
import Share from '../components/Share'
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import ProductInfoCard from '../components/ProductInfoCard';

const SidebarColumn = styled.div`
  @media (max-width: 1024px) {
    display: none !important;
  }
`

const Cover = styled.figure`
  padding: 0 1.5em 1.5em;
  max-width: 35em;
  margin: 0 1em 1em;
`

export class ProductTemplate extends Component {

  state = {
    photoIndex: 0,
    isOpen: false,
  };

  render() {
    const {
      content,
      contentComponent,
      cover,
      meta_title,
      meta_desc,
      tags,
      title,
      slug,
      products,
      amount,
      date,
      hotProduct,
      producent
    } = this.props;

    const {isOpen, photoIndex} = this.state;

    const PostContent = contentComponent || Content;

    const images = [];
    images.push(cover)

    return (
      <section className='section'>
        <SE0
          title={title}
          meta_title={meta_title}
          meta_desc={meta_desc}
          cover={cover}
          slug={slug}
        />
            <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>
        <div className="columns is-mobile" style={{justifyContent: 'space-around'}}>
          <div className="column is-full-mobile is-four-fifths">
            <div className='container content'>
              <div className='columns'>
                <div className='column is-10 is-offset-1'>
                  <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
                    {title}
                  </h1>
                  <header className='columns'>
                    <div className="column is-6">
                      <Cover>
                        <img src={cover} alt={title} />
                      </Cover>
                    </div>
                    <div className="column is-5">
                      <ProductInfoCard title={title} amount={amount} date={date} hotProduct={hotProduct} producent={producent}/>
                    </div>
                  </header>
                  <PostContent content={content} />
                  <ProductForm title={title} />
                  {tags && tags.length ? (
                    <div style={{marginTop: `4rem`}}>
                      <h4>Tagi</h4>
                      <ul className='taglist'>
                        {tags.map(tag => (
                          <li key={tag + `tag`}>
                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <hr />
                  <Share
                    title={title}
                    slug={slug}
                    excerpt={meta_desc}
                  />
                </div>
              </div>
            </div>
          </div>
          <SidebarColumn className="column is-one-fifth" >
            <Sidebar products={products}/>
          </SidebarColumn>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </section>
    )
  }
}

ProductTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  cover: PropTypes.string,
  meta_title: PropTypes.string,
  meta_desc: PropTypes.string,
  title: PropTypes.string,
  slug: PropTypes.string,
  date: PropTypes.string,
  producent: PropTypes.string,
  hotProduct: PropTypes.bool,
}

const ProductPage = ({data}) => {
  const {markdownRemark: post} = data
  const {edges: products} = data.allMarkdownRemark

  return (
    <ProductTemplate
      content={post.html}
      contentComponent={HTMLContent}
      cover={post.frontmatter.cover}
      meta_title={post.frontmatter.meta_title}
      meta_desc={post.frontmatter.meta_description}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      slug={post.fields.slug}
      products={products}
      amount={post.frontmatter.amount}
      date={post.frontmatter.date}
      hotProduct={post.frontmatter.hotProductsSelect}
      producent={post.frontmatter.producent}
    />
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductPage

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
            slug
          }
      frontmatter {
        date(formatString: "MM.DD.YYYY")
        title
        cover
        meta_title
        meta_description
        amount
        hotProductsSelect
        tags
        producent
      }
    }
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
            tags
            date(formatString: "MM.DD.YYYY")
          }
        }
      }
    }
  }
`
