import PropTypes from "prop-types";
import React from "react";

const PatternDetails = ({label, link}) => (
    <>
        {(() => {
            if (link) {
                return <a href={link}>{label}</a>;
            } else {
                return <span>{label}</span>;
            }
        })()}
    </>
);

PatternDetails.propTypes = {
    label: PropTypes.string,
    link: PropTypes.array
};

export default PatternDetails;
