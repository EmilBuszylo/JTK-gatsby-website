import React from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';

const Product = styled(Link)`
    margin: 1em 0;
    display: block;
`

const ProductsShorList = ({products, condition, itemsNum = 3}) => {

  return (
    <div className='products-short-list' style={{padding: '1.5rem', textAlign: 'center'}}>
        {{
            ['hot']: products
                .slice(0, itemsNum)
                .map(({node: product}, index) => {
                    return (
                    <Product className="products-short-list-item" to={product.fields.slug} key={product.frontmatter.title + index} >
                        <figure className="image is-2by1">
                            <img src={product.frontmatter.cover} alt={product.frontmatter.title}/>
                        </figure>
                        <section className="products-short-list-item-content"></section>
                        <h6 className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.title}</h6>
                        <p className="title is-6 has-text-danger" style={{marginBottom: ".5rem"}}>{product.frontmatter.version[0].price} zł</p>
                    </Product>
                )}),
            ['date']: products
                .slice(0, itemsNum)
                .map(({node: product}) => (
                    <Product className="products-short-list-item" to={product.fields.slug} key={product.frontmatter.title + product.frontmatter.date} >
                        <figure className="image is-5by3">
                            <img src={product.frontmatter.cover} alt={product.frontmatter.title}/>
                        </figure>
                        <section className="products-short-list-item-content"></section>
                        <h5 className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.title}</h5>
                        <p className="title is-6" style={{marginBottom: ".5rem"}}>{product.frontmatter.version[0].price} zł</p>
                        <p>Dodano: <span className="is-italic">{product.frontmatter.date}</span> </p>
                    </Product>
                ))
        }[condition] }
    </div>
  )
}

export default ProductsShorList;
