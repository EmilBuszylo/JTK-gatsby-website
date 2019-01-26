import React, {Component} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export default class ProductsPage extends Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  filterProductsGroup = (group, arg) => {
    const category = arg.replace(/\/produkty\/kategoria\//g, '');
    return group.filter(element => element.node.frontmatter.categories === category);
  }

  render () {
    const {pageContext, location} = this.props;
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
                <CategoryFilters category={location.pathname.replace(/\/produkty\/kategoria\//g, '')} />
                {Boolean(group && group.length > 0) &&
                  <ProductCard products={this.filterProductsGroup(group, location.pathname)} isHot={false} justify="flex-start" />
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
