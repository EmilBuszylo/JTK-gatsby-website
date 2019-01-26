import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll'

const InfoCardHeader = styled.p`
    margin-bottom: 0 !important;
`

const CardButton = styled(AnchorLink)`
  border-color: ${props => props.theme.accentColor} !important;
  transition: all .1s linear;

    &:hover {
      background-color: ${props => props.theme.accentColor} !important;
  }
`

export const ProductInfoCard = ({title, onVersionChange, amount, date, hotProduct, producent, version}) =>
    (
        <div className="panel">
            <InfoCardHeader className="panel-heading">
                {title}
            </InfoCardHeader>
            <a className="panel-block">
                Cena: {amount} zł
            </a>
            <a className="panel-block">
                <div className="field">
                    <label className="label" htmlFor="topic">Wersja</label>
                    <p className="control">
                    <span className="select">
                        <select name="topic" id="topic" onChange={(e) => onVersionChange(e)}>
                            {version.map((item, index) => {
                                if(index === 0) {
                                    return <option selected key={item.power + index} value={index}>{item.power}</option>
                                } else {
                                    return <option key={item.power + index} value={index}>{item.power}</option>
                                }
                            }
                            )}
                        </select>
                    </span>
                    </p>
                </div>
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
                <CardButton className="button is-link is-outlined is-fullwidth" href='#productForm'>
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

export default ProductInfoCard;
