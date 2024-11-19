import React from "react";
import "./ButtonSpecial2.css";
import { InertiaLink } from "@inertiajs/inertia-react";

const ButtonSpecial2 = ({ href, ...props }) => {
    return (
        <InertiaLink className="special__button2" {...props} href={href}>
            {props.children}
        </InertiaLink>
    );
};

export default ButtonSpecial2;
