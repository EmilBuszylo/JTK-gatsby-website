import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import Hero from '../../components/Hero';
import PostCard from '../../components/PostCard';

export default class BlogPage extends Component {
  render () {
    const {data} = this.props
    const {edges: posts} = data.allMarkdownRemark

    return (
      <div>
        <Helmet>
          <title>Blog | Gatsby Starter Business</title>
        </Helmet>
        <Hero title='blog'/>
        <section className='section'>
          <PostCard posts={posts} />
        </section>
      </div>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const blogPageQuery = graphql`
  query BlogPage {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            cover
            templateKey
            date(formatString: "MM.DD.YYYY")
          }
        }
      }
    }
  }
`
