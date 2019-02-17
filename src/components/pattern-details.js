import PropTypes from "prop-types";
import React from "react";

const PatternDetails = ({ label, links }) => (
  <details className="c-details">
    <summary>{label}</summary>
    <ul className="c-details__flyout">
      {links.map(link => (
        <li key={link.uri}>
          <a href={link.uri}>{link.title}</a>
        </li>
      ))}
    </ul>
  </details>
);

PatternDetails.propTypes = {
  label: PropTypes.string,
  links: PropTypes.array
};

PatternDetails.defaultProps = {
  label: ``,
  links: null
};

export default PatternDetails;
