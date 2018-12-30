import React from 'react';
import config from '../../../meta/config';
import Share from '../Share';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 3rem 1rem !important;
`

const Footer = ({title, slug, excerpt}) => {
  return (
    <FooterWrapper className='footer'>
      <div className='container'>
        <div className='content'>
          <p>
            Copyright © JT Klima wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </FooterWrapper>
  )
}

export default Footer
