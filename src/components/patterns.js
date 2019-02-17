import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import PatternDetails from "./pattern-details";

export default () => (
  <StaticQuery
    query={graphql`
      query latestNodePattern {
        allNodePattern(limit: 4) {
          edges {
            node {
              id
              title
              field_react
              field_vuejs
              field_angular
              field_vuejs_links {
                title
                uri
              }
              field_react_links {
                title
                uri
              }
              field_angular_ {
                title
                uri
              }
              body {
                value
                format
                processed
                summary
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
          {data.allNodePattern.edges.map(({ node }) => (
            <div className="c-patterns__pattern" key={node.id}>
              <h3>{node.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: node.body.value }} />
                {(() => {
                  if (node.field_vuejs) {
                    return (
                      <PatternDetails
                        label="Vue"
                        links={node.field_vuejs_links}
                      />
                    );
                  }
                  if (node.field_react) {
                    return (
                      <PatternDetails
                        label="React"
                        links={node.field_react_links}
                      />
                    );
                  }
                  if (node.field_angular) {
                    return (
                      <PatternDetails
                        label="Angular"
                        links={node.field_angular_links}
                      />
                    );
                  }
                })()}
            </div>
          ))}
        </div>
        <Link to="/patterns/">Show all patterns & techniques</Link>
      </div>
    )}
  />
);
