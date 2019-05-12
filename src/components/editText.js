import PropTypes from "prop-types";
import React from "react";

const EditText = ({ link }) => (
  <>
    <a className="o-buttonstyle o-buttonstyle--onwhite c-edittext" href={link}>
      Edit this content
    </a>
  </>
);

EditText.propTypes = {
  link: PropTypes.string
};

export default EditText;
