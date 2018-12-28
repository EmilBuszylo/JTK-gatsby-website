import React, { Component } from 'react';
import {navigateTo} from 'gatsby-link';
import styled from 'styled-components';

import Suggest from '../SuggestionsList';

const InputWrapper = styled.div`
  position: relative;
`

const Button = styled.button`
  width: 100%;
  height: 2rem !important;
  margin-top: .2rem;
`

class Search extends Component {

  state = {
    query: '',
    autocompleteIsActive: false,
    suggestions: [],
    queryLink: null
  }

  onChange = (e) => {

    const query = e.target.value;
    let suggestion = [];

    if(query.length > 2) {
      suggestion = this.onSearch(query, this.props.products);
    }

    this.setState(prevState => ({query: query, suggestions: suggestion}));

    if(!this.state.autocompleteIsActive) {
      this.setState(prevState => ({autocompleteIsActive: true}));
    }
  }

  onSearch = (query, products) => {
    const searchProducts = products.filter(
        product => product.node.frontmatter.title.search(query) > -1 &&
        (product.node.frontmatter.tags && product.node.frontmatter.tags.length > 0)
      );
    return searchProducts.map(product => { return ({value: product.node.fields.slug, label: product.node.frontmatter.title})});
  }

onChooseSuggestElement = (value, label) => {
  if(this.state.autocompleteIsActive) {
      this.setState(prevState => ({autocompleteIsActive: false}));
  }

  this.setState(prevState => ({query: label, queryLink: value}));
  this.myInp.focus();
}

onKeyDown = (event, queryLink) => {
  if(event.keyCode == 13) {
    navigateTo(queryLink)
  }
}

componentDidMount = ( prevProps,prevState) => {
  window.addEventListener('scroll', (event) => setTimeout(this.handleScroll, 600));
}

handleScroll = event => {
  this.setState(prevState => ({autocompleteIsActive: false}));
}

componentWillUnmount = () => {
  window.removeEventListener('scroll', (event) => this.handleScroll);
  this.setState(prevState => ({query: '', suggestions: []}));
}

  render(){
    const {queryLink, suggestions, autocompleteIsActive, query } = this.state;

    return (
      <div>
        <InputWrapper>
          <input type="text" className="input" placeholder="Wyszukaj pakiet" ref={(ip) => this.myInp = ip} value={query} onChange={(e) => this.onChange(e)} onKeyDown={(e) => this.onKeyDown(e,queryLink)} autoComplete="off"/>
          {Boolean(suggestions.length > 0 && autocompleteIsActive) &&
            <Suggest onClick={this.onChooseSuggestElement} suggestions={suggestions}/>
          }
        </InputWrapper>
        <Button className="button is-primary" onClick={queryLink ? () => navigateTo(queryLink) : null}>Szukaj</Button>
      </div>
    )
  }
}

export default Search
