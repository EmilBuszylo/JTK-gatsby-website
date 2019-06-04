import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

const Categories = styled.div`
  margin: 0.5em 0 2.5em 0;
  display: flex;
  align-items: center;
`

const Tag = styled(Link)`
  cursor: pointer;
  margin-left: 0.5em;
`

const CategoryFilters = ({ category }) => {
  return (
    <div>
      <Categories>
        Kategorie:
        <div className='tags'>
          <Tag
            className={`tag ${!category ? 'is-primary' : 'is-light'} is-medium`}
            to='/produkty'
          >
            Wszystkie
          </Tag>
          <Tag
            className={`tag ${
              category === 'split' ? 'is-primary' : 'is-light'
            } is-medium`}
            to='/produkty/kategoria/split'
          >
            Split
          </Tag>
          <Tag
            className={`tag ${
              category === 'multi-split' ? 'is-primary' : 'is-light'
            } is-medium`}
            to='/produkty/kategoria/multi-split'
          >
            Multi split
          </Tag>
        </div>
      </Categories>
    </div>
  )
}

CategoryFilters.defaultProps = {
  category: null,
}

export default CategoryFilters
