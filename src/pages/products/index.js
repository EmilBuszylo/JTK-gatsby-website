import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Helmet from 'react-helmet';
import Hero from '../../components/Hero';
import ProductCard from '../../components/ProductCard';
import Sidebar from '../../components/Sidebar';
import Searcher from '../../components/Searcher';

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

const Tag = styled.span`
  cursor: pointer;
  margin-left: .5em;
`

export default class ProductsPage extends Component {

  state = {
    category: 'all'
  }

  componentWillMount() {

    if(this.props.location.state && this.props.location.state.category &&  this.props.location.state.category !== this.state.category) {
      this.setState(prevState => ({category: this.props.location.state.category || 'all'}))
    }
  }

  getProductsByCategory = (products) => {
    const {location} = this.props;
    const {category} = this.state;

    if(category === 'all') {
      return products
    }

    if(category !== 'all' || location.state && location.state.category) {
      return products.filter(product => product.node.frontmatter.categories === this.state.category)
    }
  }

  arrayWithProductProps = (products, property ) => {
    return products.filter(product => product.node.frontmatter.categories)
    .map((product, index) => product.node.frontmatter.categories)
    .reduce((a,b) => {
      if (a.indexOf(b) < 0 ) a.push(b);
      return a;
    },[])
  }

  render () {
    const {data} = this.props
    const {edges: products} = data.allMarkdownRemark

    return (
      <div>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <Hero title='Produkty'/>
        <section className='section'>
          <div className='container'>
            <MobileSearchWrapper>
              <Searcher products={products}/>
            </MobileSearchWrapper>

            <div className="columns is-mobile" style={{justifyContent: 'space-around'}}>
              <div className="column is-full-mobile is-four-fifths">
                  <Categories>
                      Kategorie:
                    <div className="tags">
                      <Tag
                        className={`tag ${this.state.category === 'all' ? 'is-primary' : 'is-light'} is-medium`}
                        onClick={() => this.setState(prevState => ({category: 'all'}))}
                      >
                        Wszystkie
                      </Tag>
                      {this.arrayWithProductProps(products,'categories').map( element => (
                        <Tag
                          key={element}
                          className={`tag ${element === this.state.category ? 'is-primary' : 'is-light'} is-medium`}
                          onClick={() => this.setState(prevState => ({category: element}))}
                        >
                          {element}
                        </Tag>
                      ))}
                    </div>
                  </Categories>
                  {Boolean(products && products.length > 0) &&
                    <ProductCard products={this.getProductsByCategory(products)} isHot={false} justify="flex-start" />
                  }
                </div>
              <SidebarColumn className="column is-one-fifth" >
                <Sidebar products={products}/>
              </SidebarColumn>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ProductsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const productsPageQuery = graphql`
  query ProductsPage {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 80)
          id
          fields {
            slug
          }
          frontmatter {
            title
            cover
            templateKey
            hotProductsSelect
            amount
            tags
            categories
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
