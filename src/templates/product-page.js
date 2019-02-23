import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import {HTMLContent} from '../components/Content'
import ProductTemplate from '../components/ProductTemplate'

export default class ProductPage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object,
    }),
  }

  render () {
    const { pageContext, data } = this.props
    const { hotProducts, lastProducts } = pageContext
    const { markdownRemark: post } = data

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
        date={post.frontmatter.date}
        hotProduct={post.frontmatter.hotProductsSelect}
        producent={post.frontmatter.producent}
        images={post.frontmatter.images}
        version={post.frontmatter.version}
        hotProducts={hotProducts}
        lastProducts={lastProducts}
        vat={post.frontmatter.vat}
      />
    )
  }
}

export const pageQuery = graphql`
  query ProduktByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
            slug
          }
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        cover
        meta_title
        meta_description
        version {
          power
          price
        }
        hotProductsSelect
        tags
        images {
          caption
          image
        }
        producent
        vat
      }
    }
  }
`
