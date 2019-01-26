const _ = require('lodash')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({actions, graphql, arg}) => {
  const {createPage} = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000, sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 60)
            id
            fields {
              slug
            }
            frontmatter {
              title
              cover
              templateKey
              hotProductsSelect
              tags
              categories
              version {
                power
                price
              }
              date(formatString: "DD.MM.YYYY")
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    const blogPosts = result.data.allMarkdownRemark.edges.filter( edge => edge.node.frontmatter.templateKey === 'article-page' || edge.node.frontmatter.templateKey === 'article-page2')
    createPaginatedPages({
      edges: blogPosts,
      createPage: createPage,
      pageTemplate: 'src/templates/blog.js',
      pageLength: 6, // This is optional and defaults to 10 if not used
      pathPrefix: 'blog', // This is optional and defaults to an empty string if not used
      context: {}, // This is optional and defaults to an empty object if not used
    })

    const products = result.data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey === 'product-page')
    createPaginatedPages({
      edges: products,
      createPage: createPage,
      pageTemplate: 'src/templates/products.js',
      pageLength: 20, // This is optional and defaults to 10 if not used
      pathPrefix: 'produkty', // This is optional and defaults to an empty string if not used
      context: {
        lastProducts: products.slice(0, 4),
        hotProducts: products.filter(product => product.node.frontmatter.hotProductsSelect === 'tak').slice(0, 4),
      }, // This is optional and defaults to an empty object if not used
    })

    const productsByCategories = result.data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.templateKey === 'product-page')
    createPaginatedPages({
      edges: productsByCategories,
      createPage: createPage,
      pageTemplate: 'src/templates/categories.js',
      pageLength: 20, // This is optional and defaults to 10 if not used
      pathPrefix: 'produkty/kategoria/:slug', // This is optional and defaults to an empty string if not used
      context: {
        lastProducts: products.slice(0, 4),
        hotProducts: products.filter(product => product.node.frontmatter.hotProductsSelect === 'tak').slice(0, 4),
        test: arg
      }, // This is optional and defaults to an empty object if not used
    })

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          hotProducts: products.filter(product => product.node.frontmatter.hotProductsSelect === 'tak').slice(0, 4),
          lastProducts: products.slice(0, 4),
          productCategories: products.filter(product => product.node.frontmatter.categories)
            .map((product, index) => product.node.frontmatter.categories)
            .reduce((a,b) => {
              if (a.indexOf(b) < 0 ) a.push(b);
              return a;
            },[]),
          poductsTitleList: products.map(product => product.node.frontmatter.title)
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
