import React from "react";
import "./ButtonSpecial3.css";
import { InertiaLink } from "@inertiajs/inertia-react";

const ButtonSpecial3 = ({ href, ...props }) => {
    return (
        <InertiaLink className="special__button3" {...props} href={href}>
            {props.children}
        </InertiaLink>
    );
};

export default ButtonSpecial3;
