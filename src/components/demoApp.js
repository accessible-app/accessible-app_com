import React from "react";
import Image from "./image";
import { graphql, Link, StaticQuery } from "gatsby";

export default () => (
  <StaticQuery
    query={graphql`
      query singleTeaserDemoApp {
        markdownRemark(frontmatter: { type: { eq: "demoapp" } }) {
          html
          frontmatter {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="c-demoapp c-homecontent__item">
        <div>
          <h2>{data.markdownRemark.frontmatter.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: data.markdownRemark.html
            }}
          />
        </div>
        <Image/>
      </div>
    )}
  />
);
