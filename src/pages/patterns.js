import React from "react";
import Layout from "../components/layout";
import Patterns from "../components/patterns";
import Stage from "../components/stage";

const PatternsPage = () => (
  <Layout>
      <Stage>
          Test
      </Stage>
      <div>
      <h1>Different types of patterns</h1>
        <Patterns mode="page" />
    </div>
  </Layout>
);

export default PatternsPage;
