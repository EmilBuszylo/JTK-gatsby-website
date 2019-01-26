import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #fff;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    margin: 2rem auto;
    max-width: 60em;
    background-color: white;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    padding: 2em;

    @media (max-width: 640px) {
        flex-direction: column;
        padding: 1rem;
    }
`

const FeaturedImageWrapper = styled.div`
    margin-right: 2rem;
    width: 30%;
    position: relative;
    overflow: hidden;
    @media (max-width: 640px) {
        margin-right: 0;
        width: 100%;
        height: 15rem;
        margin-bottom: 1rem;
    }
`

const FeaturedImage = styled.img`
    position: absolute;
    width: auto;
    height: 100%;
    max-width: none;
    top: 50%;
    left: 50%;
    transition: transform 1s ease-in-out;
    transform: translate(-50%,-50%);
    @media (max-width: 640px) {
        width: 100%;
        min-height: 100%;
    }
`

const CardContent = styled.div`
    width: 65%;
    @media (max-width: 640px) {
        width: 100%;
        text-align: center;
    }
`

const CardDescription = styled.p`
    font-size: .9rem;
    line-height: 1.4;
    overflow-y: auto;
    height: 7rem;
    @media (max-width: 640px) {
        height: 9rem;
        text-align: left;
    }
`

const LinkButton = styled.a`
    background-color: ${props => props.theme.accentColor} !important;
    text-align: center;
    border-color: transparent;
    color: #fff !important;
    margin-bottom: 1rem;
    transition: all .1s linear;

    &:hover {
        background-color: ${props => props.theme.accentColorHover} !important;
        color: #ffffff;
        border-color: transparent;
    }

    @media (max-width: 640px) {
        margin-top: 1rem;
    }
`

const ProducentCard = ({data}) => {

    return (
      <Wrapper>
        <FeaturedImageWrapper>
            <FeaturedImage src={data.cover} alt={data.name}/>
        </FeaturedImageWrapper>
        <CardContent>
            <h3 className="title is-5">{data.name}</h3>
            <CardDescription>{data.description}</CardDescription>
            <LinkButton className="button is-rounded has-text-centered" href={data.link} target="_blank" >
                Strona producenta
            </LinkButton>
        </CardContent>
      </Wrapper>
    )
}

ProducentCard.propTypes = {
    data: PropTypes.shape({
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProducentCard;
