import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const ProductsWrapper = styled.div`
  justify-content: ${props => props.justify || "center"};
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

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
`;

const Card = styled.div`
  min-height: 24rem;
  padding: 0.5rem;
`;

const Column = styled.div`
  min-width: ${props => (props.isHot ? "15rem" : "14rem")};
  max-width: 18rem;
  width: 25%;
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const CardInformations = styled.div`
  height: 6rem;
  display: flex;
  flex-direction: column;
  border-bottom: 0.05rem solid rgba(219, 219, 219, 0.8);
`;

const CardDescription = styled.div`
  padding: 0.7rem;
  margin-bottom: 0.5rem;
`;

const ProductCard = ({ products, isHot, justify }) => {
  return (
    <ProductsWrapper
      className="columns is-mobile is-multiline"
      justify={justify ? justify : "center"}
    >
      {products
        .filter(product =>
          isHot ? product.node.frontmatter.hotProductsSelect === "tak" : "tak"
        )
        .slice(isHot ? (4, 0) : 0)
        .map(({ node: product }) => (
          <Column
            key={
              product.frontmatter.title + product.frontmatter.version[0].price
            }
            className="column is-narrow"
            isHot={isHot}
          >
            <Card className="card">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    src={product.frontmatter.cover}
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <CardInformations className="card-informations has-text-centered">
                <h3 className="title is-5" style={{ margin: ".5rem 0" }}>
                  {product.frontmatter.title}
                </h3>
                <p
                  className={`title is-5 ${
                    product.frontmatter.hotProductsSelect === "tak"
                      ? "has-text-danger"
                      : ""
                  }`}
                  style={{ marginBottom: ".5rem" }}
                >
                  {product.frontmatter.version[0].price} zł
                </p>
              </CardInformations>
              <CardDescription>
                <p>{product.excerpt}</p>
              </CardDescription>
              <div className="has-text-centered">
                <LinkButton
                  className="button is-rounded has-text-centered"
                  to={product.fields.slug}
                >
                  Szczegóły →
                </LinkButton>
              </div>
            </Card>
          </Column>
        ))}
    </ProductsWrapper>
  );
};

export default ProductCard;
