import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductsList from '../ProductsShortList';

const ListBlock = styled.div`
  text-align: center;
  margin: 0 0 2rem 0;
  padding: 0 0 1rem 1rem;
  border-left: 1px solid #ebebeb;
  max-width: 15rem;
`

const ListTitle = styled.h4`
  background-color: #4ba4e7;
  color: #ffffff !important;
  padding: 1em;
  margin-bottom: 0 !important;
`

const Sidebar = ({ lastProducts, hotProducts }) => {
  return (
    <section style={{maxWidth: '15rem'}}>
      {/* <ListBlock>
        Searcher
      </ListBlock> */}
      <ListBlock>
        <ListTitle className="title is-5">Polecane:</ListTitle>
        <ProductsList products={hotProducts} condition='hot' itemsNum={3}/>
      </ListBlock>
      <ListBlock className="has-text-centered">
        <ListTitle className="title is-5">Najnowsze:</ListTitle>
        <ProductsList products={lastProducts} condition='date' itemsNum={3}/>
      </ListBlock>
    </section>
  )
}

Sidebar.propTypes = {
  lastProducts: PropTypes.array,
  hotProducts: PropTypes.array,
};

export default Sidebar;
