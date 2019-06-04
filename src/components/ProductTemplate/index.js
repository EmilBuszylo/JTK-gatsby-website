import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import styled from 'styled-components'

import Share from '../Share'
import PropTypes from 'prop-types'
import Content from '../Content'
import SE0 from '../SEO'
import Sidebar from '../Sidebar'
import ProductForm from '../ProductForm'
import ProductInfoCard from '../ProductInfoCard'
import TagsList from '../TagsList'

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
    padding: 0.5em;
    margin: 0.5em;
  }
`

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ProductImage = styled.figure`
  padding: 0.3em !important;
  background: #eee;
  max-width: 7em;
  margin: 0.5em !important;
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

const Divider = styled.hr`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
`

export default class ProductTemplate extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    contentComponent: PropTypes.func,
    cover: PropTypes.string,
    meta_title: PropTypes.string,
    meta_desc: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    date: PropTypes.string,
    producent: PropTypes.string,
    hotProduct: PropTypes.string,
    vat: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        caption: PropTypes.string,
      })
    ),
  }

  state = {
    photoIndex: 0,
    isOpen: false,
    chosenVersion: '',
  }

  componentDidMount () {
    if (this.state.chosenVersion === '') {
      this.setState({ chosenVersion: 0 })
    }
  }

  getProductImages = (coverImage, productImages = []) => {
    let images = []

    if (!productImages || (productImages.length === 0 && coverImage)) {
      images.push(coverImage)

      return images
    }

    if (!productImages || (productImages.length === 0 && !coverImage)) {
      return images
    }

    images.push(coverImage)

    return images.concat(productImages.map(image => image.image))
  }

  onVersionChange = e => {
    const value = e.target.value
    this.setState(prevState => ({ chosenVersion: value }))
  }

  setProductPrice = () => {
    if (this.state.chosenVersion === '' || this.state.chosenVersion === 0) {
      return this.props.version[0].price
    } else {
      return this.props.version[this.state.chosenVersion].price
    }
  }

  render () {
    const {
      content,
      contentComponent,
      cover,
      meta_title,
      meta_desc,
      tags,
      title,
      slug,
      lastProducts,
      hotProducts,
      date,
      hotProduct,
      producent,
      images,
      version,
      vat,
    } = this.props

    const { isOpen, photoIndex, chosenVersion } = this.state

    const PostContent = contentComponent || Content

    const ProductImages = this.getProductImages(cover, images)

    return (
      <section className='section'>
        <SE0
          title={title}
          meta_title={meta_title}
          meta_desc={meta_desc}
          cover={cover}
          slug={slug}
        />
        <div className='container'>
          <div
            className='columns is-mobile'
            style={{ justifyContent: 'space-around' }}
          >
            <MainContent className='column is-full-mobile is-four-fifths'>
              <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
                {title}
              </h1>
              <header className='columns'>
                <div className='column is-6'>
                  <Cover onClick={() => this.setState({ isOpen: true })}>
                    <img src={cover} alt={title} />
                  </Cover>
                  {images && images.length > 0 ? (
                    <ProductImageWrapper>
                      {images.map((image, index) => (
                        <ProductImage
                          key={index + image.caption}
                          onClick={() => this.setState({ isOpen: true })}
                        >
                          <img src={image.image} alt={image.caption} />
                        </ProductImage>
                      ))}
                    </ProductImageWrapper>
                  ) : null}
                </div>
                <div className='column is-5'>
                  <ProductInfoCard
                    onVersionChange={this.onVersionChange}
                    title={title}
                    version={version}
                    amount={this.setProductPrice()}
                    date={date}
                    hotProduct={hotProduct}
                    producent={producent}
                    vat={vat}
                  />
                </div>
              </header>
              <PostContent content={content} className='content' />
              {Boolean(chosenVersion !== '' && version) && (
                <div id='productForm'>
                  <ProductForm
                    title={title}
                    chosenVersion={version[chosenVersion]}
                    version={version}
                  />
                </div>
              )}
              {tags && tags.length ? <TagsList tags={tags} /> : null}
              <Divider />
              <Share title={title} slug={slug} excerpt={meta_desc} />
            </MainContent>
            <SidebarColumn className='column is-one-fifth'>
              <Sidebar lastProducts={lastProducts} hotProducts={hotProducts} />
            </SidebarColumn>
          </div>
          {isOpen && (
            <Lightbox
              mainSrc={ProductImages[photoIndex]}
              nextSrc={ProductImages[(photoIndex + 1) % ProductImages.length]}
              prevSrc={
                ProductImages[
                  (photoIndex + ProductImages.length - 1) % ProductImages.length
                ]
              }
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + ProductImages.length - 1) %
                    ProductImages.length,
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
