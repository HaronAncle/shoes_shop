import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import HeaderSubsearchList from "./HeaderSubsearchList";
import HeaderSubsearchBrendsList from "./HeaderSubsearchBrendsList";

const HeaderSubsearch = (props) => {
    const { hrefFor, hrefName } = props;

    return (
        <div className="header__navul">
            <InertiaLink
                href={`/${hrefFor}`}
                className="header__nav-visibletitle"
            >
                {hrefName}
            </InertiaLink>

            <div className="header__nav-submenu">
                <HeaderSubsearchList hrefFor={hrefFor} />
                <HeaderSubsearchBrendsList hrefFor={hrefFor} />
            </div>
        </div>
    );
};

export default HeaderSubsearch;
