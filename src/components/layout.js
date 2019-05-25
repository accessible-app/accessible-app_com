import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./layout.css";
import NewsletterSignup from "./newsletterSignup";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header />
        <main role="main" className="c-main">
          {children}
        </main>
        <footer role="contentinfo" className="c-footer">
          <div className="o-wrapper c-footer__inner">
            <NewsletterSignup url="http://aa-mailer.test/newsletter/?list=1#promailer-form"/>
            <div className="c-footer__legal">
              <ul className="o-blanklist c-footer__meta">
                <li>
                  <a href="https://marcus.io/privacy-policy#english">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://github.com/accessible-app">
                    This project on GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/accessible_app">
                    This project on twitter
                  </a>
                </li>
                <li>
                  A project by <a href="https://marcus.io/">marcus</a>
                </li>
              </ul>
              <p>
                <small>
                  Legal stuff: Inhaltlich Verantwortlicher gemäß § 10 Absatz 3
                  MDStV: Marcus Herrmann, c/o Office D118, Danziger Str. 118,
                  10405 Berlin, accessible-app [at] marcus-herrmann [dot] com.
                </small>
              </p>
              <p>
                <small>
                  Colophon: built with <a href="https://gatsbyjs.org">Gatsby</a>{" "}
                  (see{" "}
                  <a href="https://github.com/accessible-app/accessible-app_com">
                    source
                  </a>) and hosted on <a href="https://netlify.com"> Netlify</a>
                </small>
              </p>
            </div>
          </div>
        </footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
