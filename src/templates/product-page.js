import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import ScrollableAnchor from 'react-scrollable-anchor'

import Content, {HTMLContent} from '../components/Content'
import SE0 from '../components/SEO'
import Share from '../components/Share'
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import ProductInfoCard from '../components/ProductInfoCard';
import TagsList from '../components/TagsList';

const SidebarColumn = styled.div`
  @media (max-width: 1023px) {
    display: none !important;
  }
`

const Cover = styled.figure`
  padding: 0 1.5em 1.5em;
  max-width: 30em;
  min-width: 10em;
  margin: 0 1em 1em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1023px) {
    padding: .5em;
    margin: .5em;
  }
`

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ProductImage = styled.figure`
  padding: .3em !important;
  background: #eee;
  max-width: 7em;
  margin: .5em !important;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainContent = styled.div`
  width: 80%;
    @media (max-width: 1023px) {
    width: 100%;
  }
`

export class ProductTemplate extends Component {

  state = {
    photoIndex: 0,
    isOpen: false,
  };

  getProductImages  = (coverImage, productImages = []) => {
    let images = [];


    if(!productImages || productImages.length === 0 && coverImage) {
      images.push(coverImage);

      return images;
    }

    if(!productImages || productImages.length === 0 && !coverImage) {
      return images;
    }

    images.push(coverImage);

    return images.concat( productImages.map( image => image.image));
  }

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
      producent,
      images
    } = this.props;

    const {isOpen, photoIndex} = this.state;

    const PostContent = contentComponent || Content;

    const ProductImages = this.getProductImages(cover, images);

    return (
      <section className='section'>
        <SE0
          title={title}
          meta_title={meta_title}
          meta_desc={meta_desc}
          cover={cover}
          slug={slug}
        />
        <div className="container">
        <div className="columns is-mobile" style={{justifyContent: 'space-around'}}>
          <MainContent className="column is-full-mobile is-four-fifths">
            <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
              {title}
            </h1>
            <header className='columns'>
              <div className="column is-6">
                <Cover onClick={() => this.setState({ isOpen: true })}>
                  <img src={cover} alt={title} />
                </Cover>
                {images && images.length > 0 ?
                  <ProductImageWrapper>
                    {images.map(image => (
                      <ProductImage onClick={() => this.setState({ isOpen: true })}>
                        <img src={image.image} alt={image.caption}/>
                      </ProductImage>
                    ))}
                  </ProductImageWrapper>
                  :
                  null
                }
              </div>
              <div className="column is-5">
                <ProductInfoCard title={title} amount={amount} date={date} hotProduct={hotProduct} producent={producent}/>
              </div>
            </header>
            <PostContent content={content} />
            <div id='productForm'>
              <ProductForm title={title} />
            </div>
            {tags && tags.length ?
              <TagsList tags={tags}/> : null
            }
            <hr />
            <Share
              title={title}
              slug={slug}
              excerpt={meta_desc}
            />
          </MainContent>
          <SidebarColumn className="column is-one-fifth" >
            <Sidebar products={products}/>
          </SidebarColumn>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={ProductImages[photoIndex]}
            nextSrc={ProductImages[(photoIndex + 1) % ProductImages.length]}
            prevSrc={ProductImages[(photoIndex + ProductImages.length - 1) % ProductImages.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + ProductImages.length - 1) % ProductImages.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % ProductImages.length,
              })
            }
          />
        )}
        </div>
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
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      caption: PropTypes.string
    })
  )
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
      images={post.frontmatter.images}
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
        images {
          caption
          image
        }
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
