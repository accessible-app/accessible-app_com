import React from "react";
import { StaticQuery, graphql } from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
      query singlePageAbout {
        nodePage(drupal_internal__nid: { eq: 6 }) {
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
            <div className="c-about">
                <h2>{data.nodePage.title}</h2>
                <span dangerouslySetInnerHTML={{__html: data.nodePage.body.processed}} />
            </div>
        )}
    />
)