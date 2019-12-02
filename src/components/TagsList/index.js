import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Link from 'gatsby-link';

const TagsList = ({ tags }) => (
  <div className="content" style={{ marginTop: `4rem` }}>
    <h4>Tagi</h4>
    <ul className="taglist">
      {tags.map(tag => (
        <li key={tag + `tag`}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </li>
      ))}
    </ul>
  </div>
);

TagsList.propTypes = {
  tags: PropTypes.array,
};

export default TagsList;
