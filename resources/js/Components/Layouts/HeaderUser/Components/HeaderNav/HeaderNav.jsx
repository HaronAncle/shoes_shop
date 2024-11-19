import React from "react";
import { Link } from "react-router-dom";
import { InertiaLink } from "@inertiajs/inertia-react";
import HeaderSubsearch from "./HeaderSubsearch/HeaderSubsearch";

import "./HeaderNav.css";

const HeaderNav = ({}) => {
    return (
        <nav className="header__nav">
            <div className="header__nav-block">
                <HeaderSubsearch hrefFor="womens" hrefName="Женщинам" />
                <HeaderSubsearch hrefFor="mens" hrefName="Мужчинам" />
                <HeaderSubsearch hrefFor="girls" hrefName="Девочкам" />
                <HeaderSubsearch hrefFor="boys" hrefName="Мальчикам" />
                {/* <div className="header__navul">
                    <InertiaLink
                        href="/forshoes"
                        className="header__nav-visibletitle"
                    >
                        Все для обуви
                    </InertiaLink>
                </div> */}
                <div className="header__navul">
                    <InertiaLink
                        href="/states"
                        className="header__nav-visibletitle"
                    >
                        Новости
                    </InertiaLink>
                </div>
                {/* <div className="header__navul">
                    <InertiaLink
                        href="/actions"
                        className="header__nav-visibletitle"
                    >
                        Новости
                    </InertiaLink>
                </div> */}
            </div>
            <div
                className="offcanvas offcanvas-start header__nav-add"
                tabndex="-1"
                id="offcanvasNav"
                aria-labelledby="offcanvasNavLabel"
            >
                <div className="offcanvas-header header__nav-addup">
                    <div
                        className="offcanvas-title header__nav-add-logo"
                        id="offcanvasNavLabel "
                    >
                        Jovatty
                    </div>
                    <button
                        type="button"
                        className="header__nav-add-closebtn"
                        data-bs-dismiss="offcanvas"
                        aria-label="Закрыть"
                    >
                        <svg
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                        </svg>
                    </button>
                </div>
                <div className="offcanvas-body header__nav-addbody">
                    <a className="header__nav-addcategory">Женщинам</a>
                    <a className="header__nav-addcategory">Мужчинам</a>
                    <a className="header__nav-addcategory">Девочкам</a>
                    <a className="header__nav-addcategory">Мальчикам</a>
                    {/* <a className="header__nav-addcategory">Все для обуви</a> */}
                    <a className="header__nav-addcategory">Новости</a>
                    {/* <a className="header__nav-addcategory">Акции</a> */}
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
