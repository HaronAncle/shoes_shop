import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchLeft from "./Components/SearchLeft/SearchLeft";
import SearchRight from "./Components/SearchRight/SearchRight";

import "./SearchBlock.css";

const SearchBlock = (props) => {
    useEffect(() => {
        if (document.querySelectorAll("#searchareaID").length) {
            let searcharea = document.getElementById("searchareaID");
            if (
                searcharea.querySelectorAll("#searcharea-minPriceInput").length
            ) {
                let searchareaMinPrice = searcharea.querySelector(
                    "#searcharea-minPrice"
                );
                let searchareaMinPriceUp = searcharea.querySelector(
                    "#searcharea-minPrice-up"
                );
                let searchareaMaxPrice = searcharea.querySelector(
                    "#searcharea-maxPrice"
                );
                let searchareaMaxPriceUp = searcharea.querySelector(
                    "#searcharea-maxPrice-up"
                );
                let searchareaMinPriceInput = searcharea.querySelector(
                    "#searcharea-minPriceInput"
                );
                let searchareaMaxPriceInput = searcharea.querySelector(
                    "#searcharea-maxPriceInput"
                );
                let searchareaRange =
                    searcharea.querySelector("#searcharea-range");

                function updateLabelPosition() {
                    const minLabelPositionPercent =
                        ((searchareaMinPrice.value - searchareaMinPrice.min) /
                            (searchareaMinPrice.max - searchareaMinPrice.min)) *
                        100;
                    const maxLabelPositionPercent =
                        ((searchareaMaxPrice.value - searchareaMaxPrice.min) /
                            (searchareaMaxPrice.max - searchareaMaxPrice.min)) *
                        100;

                    searchareaMinPriceUp.style.left = `calc(${minLabelPositionPercent}% - 5px)`;
                    searchareaMaxPriceUp.style.left = `calc(${maxLabelPositionPercent}% - 5px)`;
                }

                function updateRange() {
                    searchareaRange.style.left = `${
                        (searchareaMinPrice.value / searchareaMaxPrice.max) *
                        100
                    }%`;
                    searchareaRange.style.width = `${
                        ((searchareaMaxPrice.value - searchareaMinPrice.value) /
                            searchareaMaxPrice.max) *
                        100
                    }%`;
                    updateLabelPosition();
                }

                searchareaMinPrice.oninput = function () {
                    if (
                        parseInt(searchareaMinPrice.value) >
                        parseInt(searchareaMaxPrice.value)
                    ) {
                        searchareaMinPrice.value = searchareaMaxPrice.value;
                    }
                    searchareaMinPriceInput.value = searchareaMinPrice.value;
                    updateRange();
                };

                searchareaMaxPrice.oninput = function () {
                    if (
                        parseInt(searchareaMaxPrice.value) <
                        parseInt(searchareaMinPrice.value)
                    ) {
                        searchareaMaxPrice.value = searchareaMinPrice.value;
                    }
                    searchareaMaxPriceInput.value = searchareaMaxPrice.value;
                    updateRange();
                };

                searchareaMinPriceInput.oninput = function () {
                    if (
                        parseInt(searchareaMinPriceInput.value) >=
                            searchareaMinPrice.min &&
                        parseInt(searchareaMinPriceInput.value) <=
                            parseInt(searchareaMaxPriceInput.value)
                    ) {
                        searchareaMinPrice.value =
                            searchareaMinPriceInput.value;
                        updateRange();
                    }
                };

                searchareaMinPriceInput.onblur = function () {
                    let inputValue = parseInt(searchareaMinPriceInput.value);
                    if (isNaN(inputValue)) {
                        inputValue = parseInt(searchareaMinPrice.min);
                    }
                    inputValue = Math.max(
                        inputValue,
                        parseInt(searchareaMinPrice.min)
                    );
                    inputValue = Math.min(
                        inputValue,
                        parseInt(searchareaMaxPriceInput.value)
                    );
                    searchareaMinPriceInput.value = inputValue;
                    searchareaMinPrice.value = inputValue;
                    updateRange();
                };

                searchareaMaxPriceInput.oninput = function () {
                    if (
                        parseInt(searchareaMaxPriceInput.value) <=
                            searchareaMaxPrice.max &&
                        parseInt(searchareaMaxPriceInput.value) >=
                            parseInt(searchareaMinPriceInput.value)
                    ) {
                        searchareaMaxPrice.value =
                            searchareaMaxPriceInput.value;
                        updateRange();
                    }
                };

                searchareaMaxPriceInput.onblur = function () {
                    let inputValue = parseInt(searchareaMaxPriceInput.value);
                    if (isNaN(inputValue)) {
                        inputValue = parseInt(searchareaMaxPrice.max);
                    }
                    inputValue = Math.min(
                        inputValue,
                        parseInt(searchareaMaxPrice.max)
                    );
                    inputValue = Math.max(
                        inputValue,
                        parseInt(searchareaMinPriceInput.value)
                    );
                    searchareaMaxPriceInput.value = inputValue;
                    searchareaMaxPrice.value = inputValue;
                    updateRange();
                };

                searchareaMinPrice.addEventListener(
                    "input",
                    updateLabelPosition
                );
                searchareaMaxPrice.addEventListener(
                    "input",
                    updateLabelPosition
                );
                updateRange();
            }
            function handleResize() {
                var screenWidth = window.innerWidth;
                var visibleBody = searcharea.querySelector(
                    "#filter-visibleBody"
                );
                var offcanvasBody = searcharea.querySelector(
                    "#filter-offcanvasBody"
                );
                var toMoveFilter = searcharea.querySelector(
                    "#accordionPanelBlock"
                );

                if (screenWidth < 992) {
                    if (visibleBody.contains(toMoveFilter)) {
                        offcanvasBody.appendChild(toMoveFilter);
                    }
                } else {
                    if (offcanvasBody.contains(toMoveFilter)) {
                        visibleBody.appendChild(toMoveFilter);
                    }
                }
            }

            function toggleButtonState() {
                var screenWidth = window.innerWidth;
                var button = searcharea.querySelector(
                    ".searcharea__filterheader"
                );
                if (screenWidth >= 992) {
                    button.setAttribute("disabled", "disabled");
                } else {
                    button.removeAttribute("disabled");
                }
            }

            window.addEventListener("resize", toggleButtonState);
            window.addEventListener("resize", handleResize);

            toggleButtonState();
            handleResize();

            return () => {
                searchareaMinPrice.removeEventListener(
                    "input",
                    updateLabelPosition
                );
                searchareaMaxPrice.removeEventListener(
                    "input",
                    updateLabelPosition
                );
                window.removeEventListener("resize", toggleButtonState);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return (
        <div className="searcharea">
            <div className="container">
                <div className="searcharea__div" id="searchareaID">
                    <SearchLeft />
                    <SearchRight />
                </div>
            </div>
        </div>
    );
};

export default SearchBlock;
