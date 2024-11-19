import React, { useState, useEffect } from "react";

const SortType = ({ currentSortType }) => {
    const [sortType, setSortType] = useState("popularity");

    useEffect(() => {
        const currentURL = new URL(window.location.href);
        const currentSortType =
            currentURL.searchParams.get("sorttype") || "popularity";
        setSortType(currentSortType);
    }, []);

    const handleSortChange = (e) => {
        const newSortType = e.target.value;
        setSortType(newSortType);

        const currentURL = new URL(window.location.href);
        const queryParams = new URLSearchParams(currentURL.search);

        queryParams.set("sorttype", newSortType);
        queryParams.set("page", 1);

        window.location.href = `${
            currentURL.pathname
        }?${queryParams.toString()}`;
    };

    return (
        <div className="searcharea__sortparameter-block">
            <form className="searcharea__sortparameter-form">
                <select
                    className="searcharea__select form-select"
                    name="sorttype"
                    value={sortType}
                    onChange={handleSortChange}
                >
                    <option
                        className="searcharea__seloptions"
                        value="popularity"
                    >
                        Популярное
                    </option>
                    <option className="searcharea__seloptions" value="nameAZ">
                        Название (А - Я)
                    </option>
                    <option className="searcharea__seloptions" value="nameZA">
                        Название (Я - А)
                    </option>
                    <option
                        className="searcharea__seloptions"
                        value="price-rise"
                    >
                        Цена (по возрастанию)
                    </option>
                    <option
                        className="searcharea__seloptions"
                        value="price-down"
                    >
                        Цена (по убыванию)
                    </option>
                </select>
            </form>
        </div>
    );
};

export default SortType;
