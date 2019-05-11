import React, { Component } from "react";
import { graphql } from "gatsby";
import ReactHtmlParser from "react-html-parser";
import Layout from "../components/layout";
import EditText from "../components/editText";
import SEO from "../components/seo";

class PatternPageTemplate extends Component {
  render() {
    const pattern = this.props.data.markdownRemark;
    return (
      <Layout>
        <SEO title={pattern.frontmatter.title} />
        <div className="c-singlepage">
          <div className="o-wrapper o-wrapper--smaller">
            <h2>{pattern.frontmatter.title}</h2>
            {ReactHtmlParser(pattern.html)}
            <EditText link={pattern.frontmatter.edittext} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PatternPageTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        path
        edittext
      }
      html
    }
  }
`;
