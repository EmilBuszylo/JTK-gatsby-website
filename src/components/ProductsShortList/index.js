/**
 * Created by vaibhav on 2/4/18
 */
import React from 'react'
import Link from 'gatsby-link'

const ProductsShorList = ({products, condition, itemsNum = 3}) => {

  return (
    <div className='products-short-list' style={{padding: '1.5rem', textAlign: 'center'}}>
        {{
            ['hot']: products
                .filter(product => product.node.frontmatter.templateKey === 'product-page' && product.node.frontmatter.hotProductsSelect === true)
                .slice(0, itemsNum)
                .map(({node: product}, index) => {
                    return (
                    <Link className="products-short-list-item" to={product.fields.slug} key={product.frontmatter.title + index} >
                        <figure className="image is-2by1">
                            <img src="/img/klimatyzacja.png" alt={product.frontmatter.title}/>
                        </figure>
                        <section className="products-short-list-item-content"></section>
                        <h6 className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.title}</h6>
                        <p className="title is-6 has-text-danger" style={{marginBottom: ".5rem"}}>{product.frontmatter.amount}</p>
                    </Link>
                )}),
            ['date']: products
                .filter(product => product.node.frontmatter.templateKey === 'product-page')
                .slice(0, itemsNum)
                .map(({node: product}) => (
                    <Link className="products-short-list-item" to={product.fields.slug} key={product.frontmatter.title + product.frontmatter.date} >
                        <figure className="image is-5by3">
                            <img src="/img/klimatyzacja.png" alt={product.frontmatter.title}/>
                        </figure>
                        <section className="products-short-list-item-content"></section>
                        <h5 className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.title}</h5>
                        <p className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.amount}</p>
                        <p>Dodano: <span className="is-italic">{product.frontmatter.date}</span> </p>
                    </Link>
                ))
        }[condition] }
    </div>
  )
}

export default ProductsShorList
