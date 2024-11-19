import React from "react";
import "./ButtonSpecial1.css";
import { InertiaLink } from "@inertiajs/inertia-react";

const ButtonSpecial1 = ({ href, ...props }) => {
    return (
        <InertiaLink className="special__button" {...props} href={href}>
            {props.children}
        </InertiaLink>
    );
};

export default ButtonSpecial1;
