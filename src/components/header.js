import { graphql, Link, StaticQuery } from "gatsby";
import React from "react";

const Header = () => (
  <StaticQuery
    query={graphql`
      query generalSitenameQuery {
        markdownRemark(frontmatter: { type: { eq: "intro" } }) {
          frontmatter {
            title
          }
        }
      }
    `}
    render={data => (
      <header role="banner" className="c-header">
        <div className="o-wrapper c-header__inner">
          <h1>
            <Link
              to="/"
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark.frontmatter.title
              }}
            />
          </h1>
          <nav className="c-nav-main">
            <ul className="c-nav-main__list">
              <li>
                <Link to="/">
                  <span className="u-linkhelper">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/a11y-challenges-of-webapps/"
                >
                  <span className="u-linkhelper">Challenges</span>
                </Link>
              </li>
              <li>
                <Link to="/patterns/">
                  <span className="u-linkhelper">Patterns</span>
                </Link>
              </li>
              <li>
                <Link to="/contribute/">
                  <span className="u-linkhelper">Contribute</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )}
  />
);

export default Header;
