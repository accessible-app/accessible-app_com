import React from "react";
import { StaticQuery, graphql } from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
      query singlePageSpecifics {
        nodePage(drupal_internal__nid: { eq: 5 }) {
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
            <div className="c-specifics">
                <h2>{data.nodePage.title}</h2>
                <p dangerouslySetInnerHTML={{__html: data.nodePage.body.processed}} />
            </div>
        )}
    />
)