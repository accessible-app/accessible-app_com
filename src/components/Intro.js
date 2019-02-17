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
            <div className="c-intro">
                <h2>{data.nodePage.title}</h2>
                <div dangerouslySetInnerHTML={{__html: data.nodePage.body.processed}} />
            </div>
        )}
    />
)