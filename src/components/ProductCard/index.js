import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

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
  margin-bottom: 1rem;
  transition: all 0.1s linear;

  &:hover {
    background-color: ${props => props.theme.accentColorHover} !important;
    color: #ffffff;
    border-color: transparent;
  }
`

const Card = styled.div`
  min-height: 26rem;
  padding: 0.5rem;
`

const Column = styled.div`
  min-width: ${props => (props.isHot ? '15rem' : '14rem')};
  max-width: 18rem;
  width: 25%;
  @media (max-width: 1024px) {
    width: 90%;
  }
`

const CardInformations = styled.div`
  height: 6rem;
  display: flex;
  flex-direction: column;
  border-bottom: 0.05rem solid rgba(219, 219, 219, 0.8);
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const CardDescription = styled.div`
  padding: 0.7rem .2rem;
  margin-bottom: 0.5rem;
  font-size: .9rem;
  min-height: 6em;
`

const CardFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const NavLink = styled(Link)`
  color: #ff3860;
  margin-left: .3em;
  text-decoration: underline;
`

const StarDesc = styled.div`
  padding: 0.5rem .2rem;
  font-size: .8rem;
  text-align: left;
  border-top: 0.05rem solid rgba(219, 219, 219, 0.8);
`

const ProductCard = ({ products, isHot, justify }) => {
  return (
    <ProductsWrapper
      className='columns is-mobile is-multiline'
      justify={justify || 'center'}
    >
      {products
        .filter(product =>
          isHot ? product.node.frontmatter.hotProductsSelect === 'tak' : 'tak'
        )
        .slice(isHot ? (4, 0) : 0)
        .map(({ node: product }) => (
          <Column
            key={
              product.frontmatter.title + product.frontmatter.version[0].price
            }
            className='column is-narrow'
            isHot={isHot}
          >
            <Card className='card'>
              <header className='card-image'>
                <figure className='image is-2by1'>
                  <img
                    src={product.frontmatter.cover}
                    alt='Placeholder image'
                  />
                </figure>
              </header>
              <CardInformations>
                <h3 className='title is-6' style={{ margin: '.5rem 0' }}>
                  {product.frontmatter.title}
                </h3>
                <p
                  className='title is-6 has-text-danger'
                  style={{ marginBottom: '.5rem' }}
                >
                  {product.frontmatter.version[0].price} zł
                </p>
              </CardInformations>
              <CardFooter>
                <CardDescription>
                  <p>{product.excerpt}</p>
                </CardDescription>
                <LinkButton
                  className='button is-rounded has-text-centered'
                  to={product.fields.slug}
                >
                  Szczegóły →
                </LinkButton>
                <StarDesc>
                * ze standardowym <NavLink to='/montaz'> montażem</NavLink>
                </StarDesc>
              </CardFooter>
            </Card>
          </Column>
        ))}
    </ProductsWrapper>
  )
}

export default ProductCard
