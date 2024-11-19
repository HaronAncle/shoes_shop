import React, { useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

import "./Bread.css";

const Bread = ({ links, ...props }) => {
    return (
        <div className="breadcrumbs">
            <div className="container">
                <div className="breadcrumbs__div">
                    <InertiaLink className="breadcrumbs__urlreal" href="/">
                        Главная
                    </InertiaLink>
                    {links.map((link, index) => (
                        <React.Fragment key={index}>
                            {" - "}
                            {index === links.length - 1 ? (
                                <span className="breadcrumbs__text">
                                    {link.name}
                                </span>
                            ) : (
                                <InertiaLink
                                    className="breadcrumbs__urlreal"
                                    href={link.href}
                                >
                                    {link.name}
                                </InertiaLink>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bread;
