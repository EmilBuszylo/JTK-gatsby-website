import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Link from 'gatsby-link'
import styled from 'styled-components';

const TagsList = ({tags}) =>  (
        <div className="content" style={{marginTop: `4rem`}}>
            <h4>Tags</h4>
            <ul className='taglist'>
                {tags.map(tag => (
                <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
                ))}
            </ul>
        </div>
    )

TagsList.propTypes = {

}

export default TagsList;
