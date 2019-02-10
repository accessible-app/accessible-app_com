import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Layout from "../pages";

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
      <div>
        <h2>Patterns</h2>
        {data.allNodePattern.edges.map(({ node }) => (
          <div>
            <h3>{node.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.body.value }} />

            <p>
              {(() => {
                if (node.field_vuejs) {
                  return (
                    <details>
                      <summary>Vue</summary>
                        <ul>
                        {node.field_vuejs_links.map(( link ) => (
                            <li><a href={ link.uri }>{ link.title }</a></li>
                        ))}
                        </ul>
                    </details>
                  );
                }
                if (node.field_react) {
                  return <details>Vue: {node.field_react.toString()}</details>;
                }
                if (node.field_angular) {
                  return (
                    <details>Vue: {node.field_angular.toString()}</details>
                  );
                }
              })()}
            </p>
          </div>
        ))}
        <Link to="/patterns/">Show all patterns & techniques</Link>
      </div>
    )}
  />
);
