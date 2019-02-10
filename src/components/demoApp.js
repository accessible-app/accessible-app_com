import React from "react";
import Image from "./image";
import {Link} from "gatsby";

const DemoApp = () => (
    <div>
        Demo App
    <Image/>
        <Link to="/about-the-demo-app/">Read the brief</Link>

    </div>
);

export default DemoApp;
