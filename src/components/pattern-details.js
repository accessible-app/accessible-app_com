import PropTypes from "prop-types";
import React from "react";

const PatternDetails = ({ label, link }) => (
  <>
    {(() => {
      if (link) {
        return (
          <a className="c-patterns-details__link" href={link}>
            {label}
          </a>
        );
      } else {
        return <span>{label}</span>;
      }
    })()}
  </>
);

export default PatternDetails;
