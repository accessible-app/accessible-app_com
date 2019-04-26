import React, { Component } from "react";
import { graphql } from "gatsby";
import ReactHtmlParser from 'react-html-parser'
import Layout from "../components/layout";

class LongreadPageTemplate extends Component {
  render() {
    const pattern = this.props.data.markdownRemark
    return <Layout> { ReactHtmlParser(pattern.html) }</Layout>;
  }
}

export default LongreadPageTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        path
      }
      html
    }
  }
`;
