import React, { useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Pagination = ({ totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const location = new URL(window.location.href);
        const queryParams = new URLSearchParams(location.search);
        let page = parseInt(queryParams.get("page"), 10);

        if (isNaN(page) || page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }

        setCurrentPage(page);
    }, [totalPages]);

    const createPageLink = (page) => {
        const location = new URL(window.location.href);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("page", page);
        return `${location.pathname}?${queryParams.toString()}`;
    };

    const renderPageNumbers = () => {
        let pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, 5];
            } else if (currentPage >= totalPages - 2) {
                pages = [
                    totalPages - 4,
                    totalPages - 3,
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                ];
            } else {
                pages = [
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                ];
            }
        }
        return pages;
    };

    if (!totalPages || totalPages < 1) return <div></div>;

    const pages = renderPageNumbers();

    return (
        <div className="searcharea__paginationblock">
            <ul className="searcharea__down-paginationblock">
                {totalPages > 5 && currentPage > 3 && (
                    <li className="searcharea__page-item">
                        <InertiaLink
                            href={createPageLink(1)}
                            className="searcharea__page-link"
                        >
                            |«
                        </InertiaLink>
                    </li>
                )}
                <li
                    className={`searcharea__page-item ${
                        currentPage === 1 ? "disabled" : ""
                    }`}
                >
                    {currentPage > 1 ? (
                        <InertiaLink
                            href={createPageLink(currentPage - 1)}
                            className="searcharea__page-link"
                        >
                            «
                        </InertiaLink>
                    ) : (
                        <span className="searcharea__page-link">«</span>
                    )}
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`searcharea__page-item ${
                            currentPage === page ? "active" : ""
                        }`}
                    >
                        <InertiaLink
                            href={createPageLink(page)}
                            className="searcharea__page-link"
                        >
                            {page}
                        </InertiaLink>
                    </li>
                ))}
                <li
                    className={`searcharea__page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                >
                    {currentPage < totalPages ? (
                        <InertiaLink
                            href={createPageLink(currentPage + 1)}
                            className="searcharea__page-link"
                        >
                            »
                        </InertiaLink>
                    ) : (
                        <span className="searcharea__page-link">»</span>
                    )}
                </li>
                {totalPages > 5 && currentPage < totalPages - 2 && (
                    <li className="searcharea__page-item">
                        <InertiaLink
                            href={createPageLink(totalPages)}
                            className="searcharea__page-link"
                        >
                            »|
                        </InertiaLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;
