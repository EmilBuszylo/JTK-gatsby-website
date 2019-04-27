import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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

const Distinct = styled.span`
  color: #ff3860;
  margin-left: .3em;
`

const NavLink = styled(Link)`
  color: #ff3860;
  margin-left: .3em;
  text-decoration: underline;
`

export const ProductInfoCard = ({title, onVersionChange, amount, date, producent, version, vat}) =>
  (
    <div className='panel'>
      <InfoCardHeader className='panel-heading'>
        {title}
      </InfoCardHeader>
      <a className='panel-block'>
                Cena: {amount} zł netto<Distinct>*</Distinct>
      </a>
      <a className='panel-block'>
        <div className='field'>
          <label className='label' htmlFor='topic'>Wersja</label>
          <p className='control'>
            <span className='select'>
              <select name='topic' id='topic' onChange={(e) => onVersionChange(e)}>
                {version.map((item, index) => {
                  if (index === 0) {
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
      <a className='panel-block'>
        Producent: {producent}
      </a>
      <a className='panel-block'>
        Produkt dodano: {date}
      </a>
      <a className='panel-block has-text-danger'>
            * ze standardowym <NavLink to='/montaz'> montażem</NavLink>
      </a>
      <a className='panel-block'>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: vat }}
        />
      </a>
      <div className='panel-block'>
        <CardButton className='button is-link is-outlined is-fullwidth' href='#productForm'>
            Zapytaj o ten produkt
        </CardButton>
      </div>
    </div>
  )

ProductInfoCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.string,
}

export default ProductInfoCard
