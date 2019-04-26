import React from "react";

const Stage = props => (
  <div className="c-stage">
    <div className="o-wrapper c-stage__inner">{props.children}</div>
  </div>
);

export default Stage;
