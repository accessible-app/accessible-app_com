import React from "react";
import { StaticQuery, graphql } from "gatsby";

export default () => (
  <StaticQuery
    query={graphql`
      query singlePageSpecifics {
        markdownRemark(frontmatter: { type: { eq: "challenges" } }) {
          frontmatter {
            path
            teaser_title
            intro
          }
        }
      }
    `}
    render={data => (
      <div className="c-specifics c-homecontent__item">
        <h2>{data.markdownRemark.frontmatter.teaser_title}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.frontmatter.intro
          }}
        />
        <p>
          <a href={data.markdownRemark.frontmatter.path}>
            Read more about accessibility challenges in web apps
          </a>
        </p>
      </div>
    )}
  />
);
