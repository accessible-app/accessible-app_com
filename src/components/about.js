import React from "react";
import { StaticQuery, graphql } from "gatsby";

export default () => (
  <StaticQuery
    query={graphql`
      query singlePageAbout {
        markdownRemark(frontmatter: { type: { eq: "about" } }) {
          html
          frontmatter {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="c-about">
        <h2>{data.markdownRemark.frontmatter.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html
          }}
        />
      </div>
    )}
  />
);
