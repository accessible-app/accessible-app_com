import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import PatternDetails from "./pattern-details";

export default props => (
  <StaticQuery
    query={graphql`
      query allPatternTeasers {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "pattern_teaser" } } }
        ) {
          edges {
            node {
              html
              headings {
                depth
                value
              }
              frontmatter {
                title
                type
                vue
                react
                angular
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="c-patterns">
        <h2 className="u-visually-hidden">Patterns</h2>
        <div className="c-patterns__wrapper">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div
              className="c-patterns__pattern"
              data-mode={props.mode}
              key={node.frontmatter.title}
            >
              <div className="inner">
                <h3>{node.frontmatter.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: node.html }} />
              </div>
              <ul className="c-patterns-details">
                <li className="c-patterns-details__item">
                  <PatternDetails label="Vue" link={node.frontmatter.vue} />
                </li>
                <li className="c-patterns-details__item">
                  <PatternDetails label="React" link={node.frontmatter.react} />
                </li>
                <li className="c-patterns-details__item">
                  <PatternDetails
                    label="Angular"
                    link={node.frontmatter.angular}
                  />
                </li>
              </ul>
              <Link to="/contribute/" className="o-interferer">
                Contribute!
              </Link>
            </div>
          ))}
        </div>
      </div>
    )}
  />
);
