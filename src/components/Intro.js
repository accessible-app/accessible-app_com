import React from "react";
import { StaticQuery, graphql } from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
      query singlePageIntro {
        nodePage(drupal_internal__nid: { eq: 4 }) {
          title
          body {
            value
            format
            processed
            summary
          }
        }
      }
    `}
        render={data => (
            <header>
                <h2>{data.nodePage.title}</h2>
                <p dangerouslySetInnerHTML={{__html: data.nodePage.body.processed}} />
            </header>
        )}
    />
)