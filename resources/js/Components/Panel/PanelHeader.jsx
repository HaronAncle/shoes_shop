import React, { useEffect } from "react";
import "./PanelHeader.css";
import ButtonAWarning from "../UIGlobal/ButtonWarning/ButtonWarning";

const PanelHeader = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button
                    id="sidebarToggleTop"
                    className="btn btn-link rounded-circle mr-3"
                >
                    <i className="fa fa-bars"></i>
                </button>
                <div className="ml-auto d-flex align-items-center">
                    {/* <a className="nav-link" href="/" title="messendger">
                        <i className="fa-solid fa-envelope"></i>
                    </a> */}
                    <a
                        className="nav-link"
                        href="/dashboard"
                        title="Личный кабинет"
                    >
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <a className="nav-link" href="/" title="Главная">
                        <i className="fas fa-home fa-fw"></i>
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default PanelHeader;
