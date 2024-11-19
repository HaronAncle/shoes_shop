import React from "react";
import "./ButtonSpecial4.css";

const ButtonSpecial4 = ({ href, ...props }) => {
    return (
        <button className="special__button4" {...props}>
            {props.children}
        </button>
    );
};

export default ButtonSpecial4;
