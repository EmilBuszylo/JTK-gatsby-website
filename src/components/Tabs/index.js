import React from 'react';
import styled from 'styled-components';
import {navigateTo} from 'gatsby-link';

const EvenRow = styled.section`
    background-color: ${props => props.theme.accentColor};
    display: flex;
    align-items: center;
    cursor: pointer;
    background-image: linear-gradient(to left,
    transparent,
    transparent 50%,
    #00d1b2 50%,
    #00d1b2);
    background-position: 100% 0;
    background-size: 200% 100%;
    transition: all .3s ease-in;
    min-height: 8rem;
    padding: 0 1.5rem;
    width: 100%;
    &:hover {
        background-position: 0 0;
        color:#333;
    }
`

const OddRow = styled.section`
    background-color: ${props => props.theme.accentColorHover};
    display: flex;
    align-items: center;
    cursor: pointer;
    background-image: linear-gradient(to left,
    transparent,
    transparent 50%,
    #00d1b2 50%,
    #00d1b2);
    background-position: -100% 0;
    background-size: 200% 100%;
    transition: all .25s ease-in;
    min-height: 8rem;
    padding: 0 1.5rem;
    width: 100%;
    &:hover {
        background-position: 0 0;
        color:#333;
    }
`

const CategoryLinkEven = styled.h3`
    color: #fff;
    font-size: 2.2rem;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
`

const CategoryLinkOdd = styled.h3`
    color: #fff;
    font-size: 2.2rem;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`

const ProductCard = ({categories}) => {
  return (
    <div>
        {categories.map((category, index) => {
            if(index + 1 % 1 === 0) {
                return (
                    <EvenRow key={category}>
                    <CategoryLinkEven onClick={() => navigateTo({
                        pathname: '/products',
                        state: {
                            category: category
                        }
                    })}>
                        {category}
                    </CategoryLinkEven>
                    </EvenRow>
                )
            } else {
                return (
                    <OddRow key={category}>
                        <CategoryLinkOdd onClick={() => navigateTo({
                            pathname: '/products',
                            state: {
                                category: category
                            }
                        })}>
                            {category}
                        </CategoryLinkOdd>
                    </OddRow>
                )
            }
        })}
    </div>
  )
}

export default ProductCard
