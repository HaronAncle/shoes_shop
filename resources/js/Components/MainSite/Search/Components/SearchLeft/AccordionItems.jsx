import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkbox from "@/Components/UIGlobal/Checkbox/Checkbox";

const AccordionItems = ({ filtersConfig }) => {
    //, onFilterChange
    // const [selectedFilters, setSelectedFilters] = useState(() => {
    //     const initialFilters = {};
    //     filtersConfig.forEach((filter) => {
    //         initialFilters[filter.name] = filter.options.map(() => false);
    //     });
    //     return initialFilters;
    // });

    // const handleCheckboxChange = (filterName, index) => {
    //     const updatedFilters = { ...selectedFilters };
    //     updatedFilters[filterName][index] = !updatedFilters[filterName][index];
    //     setSelectedFilters(updatedFilters);
    //     onFilterChange(updatedFilters);
    // };
    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        const queryString = window.location.search;

        const queryStringWithoutQuestionMark = queryString.slice(1);

        const pairs = queryStringWithoutQuestionMark.split("&");

        const paramsObject = {};

        pairs.forEach((pair) => {
            const [key, value] = pair.split("=");
            const decodedKey = decodeURIComponent(key);
            const decodedValue = decodeURIComponent(value);
            if (paramsObject.hasOwnProperty(decodedKey)) {
                if (!Array.isArray(paramsObject[decodedKey])) {
                    paramsObject[decodedKey] = [paramsObject[decodedKey]];
                }
                paramsObject[decodedKey].push(decodedValue);
            } else {
                paramsObject[decodedKey] = decodedValue;
            }
        });
        setQueryParams(paramsObject);
    }, []);
    return (
        <div
            className="accordion searcharea__filterarea"
            id="accordionPanelsFilter"
        >
            {filtersConfig.map((filter, index) => (
                <div
                    className="accordion-item searcharea__accordion-item"
                    key={index}
                >
                    <div className="accordion-header searcharea__accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-filter${index}`}
                            aria-expanded="false"
                            aria-controls={`#panelsStayOpen-filter${index}`}
                        >
                            {filter.label}:
                        </button>
                    </div>
                    <div
                        id={`panelsStayOpen-filter${index}`}
                        className="accordion-collapse collapse"
                    >
                        <div className="accordion-body searcharea__accordion-body">
                            {filter.options.map((option, index2) => (
                                <div
                                    className="searcharea__accordion-formcheck"
                                    key={index2}
                                >
                                    <Checkbox
                                        key={`checkbox-${index}-${index2}`}
                                        option={option}
                                        index={index}
                                        index2={index2}
                                        queryParams={queryParams}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`f-ch${index}-${index2}`}
                                    >
                                        {" "}
                                        {option.title}{" "}
                                        <span className="searcharea__spancount">
                                            ({option.totalcount})
                                        </span>{" "}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* <div className="accordion-item searcharea__accordion-item">
                <div className="accordion-header searcharea__accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-filter3"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-filter3"
                    >
                        Цена
                    </button>
                </div>
                <div
                    id="panelsStayOpen-filter3"
                    className="accordion-collapse collapse show"
                >
                    <div className="accordion-body searcharea__accordion-body">
                        <div className="searcharea__accordion-filterbody"></div>
                        <div className="searcharea__range-slider">
                            <div
                                className="searcharea__slider-minmaxrange-up"
                                id="searcharea-minPrice-up"
                            ></div>
                            <div
                                className="searcharea__slider-minmaxrange-up"
                                id="searcharea-maxPrice-up"
                            ></div>
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                value="10"
                                className="searcharea__slider-minmaxrange"
                                id="searcharea-minPrice"
                            />
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                value="1000"
                                className="searcharea__slider-minmaxrange"
                                id="searcharea-maxPrice"
                            />

                            <div
                                id="searcharea-range"
                                className="searcharea__range-style"
                            ></div>
                        </div>
                        <div className="searcharea__range-slider">
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                value="10"
                                className="searcharea__slider-minmaxrange"
                                id="searcharea-minPrice"
                            />
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                value="1000"
                                className="searcharea__slider-minmaxrange"
                                id="searcharea-maxPrice"
                            />
                            <div
                                id="searcharea-range"
                                className="searcharea__range-style"
                            ></div>
                        </div>
                        <div className="searcharea__inputrange-slider">
                            <input
                                type="number"
                                id="searcharea-minPriceInput"
                                className="searcharea__inputblock"
                                value="10"
                            />
                            <input
                                type="number"
                                id="searcharea-maxPriceInput"
                                className="searcharea__inputblock"
                                value="1000"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AccordionItems;
