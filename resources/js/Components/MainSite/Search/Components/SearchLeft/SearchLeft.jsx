import React, { useState, useEffect } from "react";
import axios from "axios";
import AccordionItems from "./AccordionItems";
import Loading from "@/Components/UIGlobal/Loading/Loading";

const SearchLeft = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/search/getfilters");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
            }
        };

        fetchData();
    }, []);

    const filtersConfig = data;

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const parameters = {};

        for (let [key, value] of formData.entries()) {
            if (!parameters[key]) {
                parameters[key] = [];
            }
            parameters[key].push(value);
        }

        // Extract current URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Add page, sorttype, and viewforcount if they exist
        ["sorttype", "viewforcount"].forEach((param) => {
            if (urlParams.has(param)) {
                parameters[param] = [urlParams.get(param)];
            }
        });

        const queryString = Object.keys(parameters)
            .map((key) => `${key}=${parameters[key].join(",")}`)
            .join("&");

        const url = `/search?${queryString}`;

        window.location.href = url;
    };

    return (
        <div className="searcharea__left">
            <button
                className="searcharea__filterheader"
                id="searcharea__filter-header-button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasFilter"
                aria-controls="offcanvasFilter"
            >
                <div className="searcharea__filterheaderlogo smalllogo">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>{`.cls-1 {fill: none;}`}</style>
                        </defs>

                        <g>
                            <path d="M28,9H11a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                            <path d="M7,9H4A1,1,0,0,1,4,7H7A1,1,0,0,1,7,9Z" />
                            <path d="M21,17H4a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z" />
                            <path d="M11,25H4a1,1,0,0,1,0-2h7a1,1,0,0,1,0,2Z" />
                            <path d="M9,11a3,3,0,1,1,3-3A3,3,0,0,1,9,11ZM9,7a1,1,0,1,0,1,1A1,1,0,0,0,9,7Z" />
                            <path d="M23,19a3,3,0,1,1,3-3A3,3,0,0,1,23,19Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,23,15Z" />
                            <path d="M13,27a3,3,0,1,1,3-3A3,3,0,0,1,13,27Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,13,23Z" />
                            <path d="M28,17H25a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" />
                            <path d="M28,25H15a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                        </g>
                        <g>
                            <rect className="cls-1" height="32" width="32" />
                        </g>
                    </svg>
                </div>
                <div className="searcharea__filterheadername">Фильтры</div>
            </button>
            <form
                action="#"
                method="get"
                className="searcharea__form"
                onSubmit={handleSubmit}
            >
                <div
                    className="offcanvas offcanvas-top"
                    tabIndex="-1"
                    id="offcanvasFilter"
                    aria-labelledby="offcanvasFilterLabel"
                >
                    <div className="searcharea__offcanvas-header">
                        <div className="searcharea__offcanvas-nameblock">
                            <div className="searcharea__offcanvas-logo smalllogo">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <style>{`.cls-1 {fill: none;}`}</style>
                                    </defs>
                                    <g>
                                        <path d="M28,9H11a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                                        <path d="M7,9H4A1,1,0,0,1,4,7H7A1,1,0,0,1,7,9Z" />
                                        <path d="M21,17H4a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z" />
                                        <path d="M11,25H4a1,1,0,0,1,0-2h7a1,1,0,0,1,0,2Z" />
                                        <path d="M9,11a3,3,0,1,1,3-3A3,3,0,0,1,9,11ZM9,7a1,1,0,1,0,1,1A1,1,0,0,0,9,7Z" />
                                        <path d="M23,19a3,3,0,1,1,3-3A3,3,0,0,1,23,19Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,23,15Z" />
                                        <path d="M13,27a3,3,0,1,1,3-3A3,3,0,0,1,13,27Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,13,23Z" />
                                        <path d="M28,17H25a1,1,0,0,1,0-2h3a1,1,0,0,1,0,2Z" />
                                        <path d="M28,25H15a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                                    </g>
                                    <g>
                                        <rect
                                            className="cls-1"
                                            height="32"
                                            width="32"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <div className="searcharea__offcanvas-name">
                                Фильтры
                            </div>
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
                    <div
                        className="offcanvas-body accordion searcharea__filterarea"
                        id="filter-offcanvasBody"
                    ></div>
                </div>
                <div
                    className="accordion searcharea__filterarea"
                    id="filter-visibleBody"
                >
                    {loading ? ( // Показываем индикатор загрузки, если данные еще загружаются
                        <Loading size="md" />
                    ) : (
                        <div id="accordionPanelBlock">
                            <AccordionItems filtersConfig={filtersConfig} />
                            <div className="searcharea__submitresetarea">
                                <div className="searcharea__subresbuttons">
                                    <input type="submit" value="Показать" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchLeft;
