import React, {Component} from 'react'
import {Link} from 'gatsby'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationLink = (props) => {
  if (!props.test) {
    return (
      <Link to={`${props.baseUrl}/${props.url}`} className='button is-rounded'>
        {props.text}
      </Link>
    )
  } else {
    return (
      <span disabled className='button is-rounded'>
        {props.text}
      </span>
    )
  }
}

export default PaginationLink;
