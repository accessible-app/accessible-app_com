import React from "react";

import Layout from "../components/layout";
import Intro from "../components/intro";
import Challenges from "../components/challenges";
import About from "../components/about";
import Patterns from "../components/patterns";
import DemoApp from "../components/demoApp";
import Stage from "../components/stage";
import SEO from "../components/seo";
import BodyClassName from "react-body-classname";

const IndexPage = () => (
  <BodyClassName className="page--home">
    <Layout>
      <SEO title="Welcome" />
      <Stage>
        <Intro />
        <Patterns mode="home" />
      </Stage>
      <div className="o-wrapper o-wrapper--smaller c-homecontent">
        <Challenges />
        <About />
        <DemoApp />
      </div>
    </Layout>
  </BodyClassName>
);

export default IndexPage;
