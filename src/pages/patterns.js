import React from "react";
import Layout from "../components/layout";

const PatternsPage = ({data}) => (
  <Layout>
    <div>
      <h1>Different types of patterns</h1>
      {data.allNodePattern.edges.map(({ node }) => (
        <div>
          <h3>{node.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: node.body.value }} />
        </div>
      ))}
    </div>
  </Layout>
);

export default PatternsPage;

export const query = graphql`
  query allNodePattern {
    allNodePattern {
      edges {
        node {
          id
          title
          body {
            value
            format
            processed
            summary
          }
        }
      }
    }
  }
`;
