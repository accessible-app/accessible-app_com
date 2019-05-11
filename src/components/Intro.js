import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Arrow from "./arrow";

export default () => (
  <StaticQuery
    query={graphql`
      query generalIntroQuery {
        markdownRemark(frontmatter: { type: { eq: "intro" } }) {
          frontmatter {
            intro
          }
        }
      }
    `}
    render={data => (
      <div className="c-intro">
        <p className="c-intro__text">{data.markdownRemark.frontmatter.intro}</p>

        <ul className="o-blanklist c-buttongroup">
          <li>
            <Link to="/patterns/" className="o-buttonstyle">
              See all patterns <Arrow />
            </Link>
          </li>
          <li>
            <a
              href="https://vuejs.accessible-app.com"
              className="o-buttonstyle"
            >
              Visit the demo app <Arrow />
            </a>
          </li>
          <li>
            <Link to="/contribute/" className="o-buttonstyle">
              Contribute <Arrow />
            </Link>
          </li>
        </ul>
      </div>
    )}
  />
);
