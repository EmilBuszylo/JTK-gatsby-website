import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const ProductsWrapper = styled.div`
  justify-content: ${props => props.justify || 'center'};
  @media (max-width: 1024px) {
    justify-content: center;
  }
`

const LinkButton = styled(Link)`
  background-color: ${props => props.theme.accentColor} !important;
  text-align: center;
  border-color: transparent;
  color: #fff !important;
  transition: all .1s linear;

    &:hover {
      background-color: ${props => props.theme.accentColorHover} !important;
      color: #ffffff;
      border-color: transparent;
  }
`

const Card = styled.div`
  min-height: 22rem;
  padding: .5rem;
`

const Column = styled.div`
  min-width: ${props => props.isHot ? "15rem" : "14rem"};
  max-width: 18rem;
  width: 25%;
  @media (max-width: 1024px) {
    width: 90%;
  }
`

const ProductCard = ({products, isHot, justify}) => {
  return (
    <ProductsWrapper className="columns is-mobile is-multiline" justify={justify ? justify : 'center'}>
      {products
        .filter(product => product.node.frontmatter.templateKey === 'product-page' && (isHot ? product.node.frontmatter.hotProductsSelect === true : true))
        .slice(isHot ? (4, 0) : 0)
        .map(({node: product}) => (
          <Column key={product.frontmatter.title + product.frontmatter.version[0].price} className="column is-narrow" isHot={isHot}>
            <Card className="card">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img src={product.frontmatter.cover} alt="Placeholder image"/>
                </figure>
              </div>
              <div className="card-informations has-text-centered">
                <h3 className="title is-4" style={{margin: ".5rem 0"}}>{product.frontmatter.title}</h3>
                <p className={`title is-4 ${product.frontmatter.hotProductsSelect ? 'has-text-danger' : '' }`} style={{marginBottom: ".5rem"}}>{product.frontmatter.version[0].price} zł</p>
              </div>
              <div className="content" style={{padding: ".5rem", marginBottom: ".5rem"}}>
                <p>{product.excerpt}</p>
              </div>
              <div className="has-text-centered">
                <LinkButton className="button is-rounded has-text-centered" to={product.fields.slug}>
                  Szczegóły →
                </LinkButton>
              </div>
            </Card>
          </Column>
        ))}
    </ProductsWrapper>
  )
}

export default ProductCard
