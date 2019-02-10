import React from "react";
import {StaticQuery, graphql} from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
        query allNodeArticles {
          allNodeArticle {
            edges {
              node {
                field_url {
                  uri
                }
                title
              }
            }
          }
        }

    `}
        render={data => (
            <ul>
                <h2>Building #accessibleapp</h2>
                {data.allNodeArticle.edges.map(({node}) => (
                    <li>
                        <a href={node.field_url.uri}>{node.title}</a>
                    </li>
                ))}
            </ul>
        )}
    />
)