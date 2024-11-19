import React, { useEffect } from "react";
import "./ButtonWarning.css";

const ButtonAWarning = ({ children, ...props }) => {
    return (
        <a className="btn btn-outline-danger btn-sm mr-3" {...props}>
            {children}
        </a>
    );
};

export default ButtonAWarning;
