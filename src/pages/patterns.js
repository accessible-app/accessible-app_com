import React from "react";
import Layout from "../components/layout";
import Patterns from "../components/patterns-all";
import SEO from "../components/seo";

const PatternsPage = () => (
  <Layout>
    <SEO title="Patterns" />
    <div className="c-singlepage">
      <div className="o-wrapper o-wrapper--smaller">
        <h2>Different types of patterns</h2>
        <Patterns mode="page" />
      </div>
    </div>
  </Layout>
);

export default PatternsPage;
