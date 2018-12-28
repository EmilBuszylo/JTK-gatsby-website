import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const InfoCardHeader = styled.p`
    margin-bottom: 0 !important;
`

const CardButton = styled.button`
  border-color: ${props => props.theme.accentColor} !important;
  transition: all .1s linear;

    &:hover {
      background-color: ${props => props.theme.accentColor} !important;
  }
`

export const ProductInfoCard = ({title, amount, date, hotProduct, producent}) =>
    (
        <div className="panel">
            <InfoCardHeader className="panel-heading">
                {title}
            </InfoCardHeader>
            <a className="panel-block">
                Cena: {amount} zł
            </a>
            <a className="panel-block">
                Producent: {producent}
            </a>
            <a className="panel-block">
                Produkt dodano: {date}
            </a>
            {Boolean(hotProduct) &&
            <a className="panel-block has-text-danger has-text-centered">
                Produkt objęty promocją!
            </a>
            }
            <div className="panel-block">
            <CardButton className="button is-link is-outlined is-fullwidth">
                Zamów ten produkt
            </CardButton>
            </div>
      </div>
    )

ProductInfoCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.number,
  hotProduct: PropTypes.bool,
}

export default ProductInfoCard
