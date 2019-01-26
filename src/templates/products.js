import React, {Component} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link'

import config from '../../data/config'
import Helmet from 'react-helmet'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import PaginationLink from '../components/PaginationLink';
import CategoryFilters from '../components/CategoryFilters';

const SidebarColumn = styled.div`
  @media (max-width: 1024px) {
    display: none !important;
  }
`

const MobileSearchWrapper = styled.div`
  padding: 0 1.5rem 3rem 1.5rem;
  @media (min-width: 1024px) {
    display: none !important;
  }
`

const Categories = styled.div`
  margin: 0.5em 0 2.5em 0;
  display: flex;
  align-items: center;
`

const Tag = styled(Link)`
  cursor: pointer;
  margin-left: .5em;
`

export default class ProductsPage extends Component {

  state = {
    category: 'all'
  }

  render () {
    const {pageContext} = this.props;
    const {group, index, first, last, additionalContext} = pageContext;
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString() + '/';

    const websiteSchemaOrgJSONLD = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    }

    console.log(pageContext)

    return (
      <div>
        <Helmet>
          <title>Produkty</title>
          {/* Schema.org tags */}
          <script type='application/ld+json'>
            {JSON.stringify(websiteSchemaOrgJSONLD)}
          </script>
        </Helmet>
        <Hero title='Produkty'/>
        <section className='section'>
          <div className='container'>
            <div className="columns is-mobile" style={{justifyContent: 'space-around'}}>
              <div className="column is-full-mobile is-four-fifths">
                <CategoryFilters />
                {Boolean(group && group.length > 0) &&
                  <ProductCard products={group} isHot={false} justify="flex-start" />
                }
                <section className='section'>
                  <div className='buttons is-centered'>
                    <PaginationLink test={first} url={previousUrl} text='Poprzednia strona' baseUrl="produkty"/>
                    <PaginationLink test={last} url={nextUrl} text='Następna strona' baseUrl="produkty"/>
                  </div>
                </section>
              </div>
                <SidebarColumn className="column is-one-fifth" >
                  <Sidebar lastProducts={additionalContext.lastProducts} hotProducts={additionalContext.hotProducts}/>
                </SidebarColumn>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
