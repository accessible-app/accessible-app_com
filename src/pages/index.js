import React from "react";

import Layout from "../components/layout";
import Intro from "../components/intro";
import Specifics from "../components/specifics";
import About from "../components/about";
import Patterns from "../components/patterns";
import DemoApp from "../components/demoApp";
import BuildingBlog from "../components/buildingblog";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Intro />
    <Specifics />
    <Patterns />
    <About />
    <DemoApp />
    <BuildingBlog />
  </Layout>
);

export default IndexPage;
