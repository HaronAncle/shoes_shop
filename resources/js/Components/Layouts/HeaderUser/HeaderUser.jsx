import React from "react";
import "./HeaderUser.css";
import HeaderUp from "./Components/HeaderUp/HeaderUp";
import HeaderNav from "./Components/HeaderNav/HeaderNav";

const HeaderUser = ({}) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__div">
                    <HeaderUp />
                    <HeaderNav />
                </div>
            </div>
        </header>
    );
};

export default HeaderUser;
