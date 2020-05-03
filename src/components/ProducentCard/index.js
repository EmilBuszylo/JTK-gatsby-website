import React from "react";
import PropTypes from "prop-types";

import {
  Wrapper,
  FeaturedImageWrapper,
  FeaturedImage,
  CardContent,
  CardDescription,
  LinkButton,
} from "./styled";

const ProducentCard = ({ data }) => {
  return (
    <Wrapper>
      <FeaturedImageWrapper>
        <FeaturedImage
          fluid={data.cover.childImageSharp.fluid}
          alt={data.name}
          {...data.cover.childImageSharp}
        />
      </FeaturedImageWrapper>
      <CardContent>
        <h3 className="title is-5">{data.name}</h3>
        <CardDescription className="content" md={data.description} />
        <LinkButton
          className="button is-rounded has-text-centered"
          href={data.link}
          target="_blank"
        >
          Strona producenta
        </LinkButton>
      </CardContent>
    </Wrapper>
  );
};

ProducentCard.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProducentCard;
