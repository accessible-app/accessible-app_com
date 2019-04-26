/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.path
    });
  }
};

// Will create pages for talks (route : /talk/{slug})
// Will create pages for posts (route : /{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          patterns: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/patterns/" } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  title
                  path
                }
                html
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const patternTemplate = path.resolve("./src/templates/pattern.js");

        _.each(result.data.patterns.edges, edge => {
          createPage({
            path: `${edge.node.frontmatter.path}`,
            component: patternTemplate,
            context: {
              pathname: "pattern",
              id: edge.node.id
            }
          });
        });
        resolve();
      })

      .then(() => {
        graphql(
          `
            {
              longreads: allMarkdownRemark(
                filter: { fileAbsolutePath: { regex: "/longreads/" } }
              ) {
                edges {
                  node {
                    id
                    html
                    frontmatter {
                      title
                      path
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
          }
          const postTemplate = path.resolve("./src/templates/longread.js");
          _.each(result.data.longreads.edges, edge => {
            createPage({
              path: `${edge.node.frontmatter.path}`,
              component: postTemplate,
              context: {
                id: edge.node.id
              }
            });
          });
          resolve();
        });
      });
  });
};
