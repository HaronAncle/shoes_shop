import React, { useState, useEffect } from "react";

const ViewForCount = () => {
    const [viewForCount, setViewForCount] = useState(24);

    useEffect(() => {
        const currentURL = new URL(window.location.href);
        const paramValue = currentURL.searchParams.get("viewforcount");
        if (paramValue) {
            setViewForCount(parseInt(paramValue));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentURL = new URL(window.location.href);
        const queryParams = new URLSearchParams(currentURL.search);

        queryParams.set("viewforcount", viewForCount);
        queryParams.set("page", 1);

        window.location.href = `${
            currentURL.pathname
        }?${queryParams.toString()}`;
    };

    const handleChange = (value) => {
        setViewForCount(value);
    };

    return (
        <div className="searcharea__viewfor-block">
            <div className="searcharea__viewfor-label">Показывать:</div>
            <form onSubmit={handleSubmit} className="searcharea__viewfor-count">
                <input type="hidden" name="viewforcount" value={viewForCount} />
                <button
                    type="submit"
                    className={`searcharea__button-count ${
                        viewForCount === 24 ? "searcharea__selected-bcount" : ""
                    }`}
                    onClick={() => handleChange(24)}
                >
                    24
                </button>
            </form>
            <form onSubmit={handleSubmit} className="searcharea__viewfor-count">
                <input type="hidden" name="viewforcount" value={viewForCount} />
                <button
                    type="submit"
                    className={`searcharea__button-count ${
                        viewForCount === 36 ? "searcharea__selected-bcount" : ""
                    }`}
                    onClick={() => handleChange(36)}
                >
                    36
                </button>
            </form>
            <form onSubmit={handleSubmit} className="searcharea__viewfor-count">
                <input type="hidden" name="viewforcount" value={viewForCount} />
                <button
                    type="submit"
                    className={`searcharea__button-count ${
                        viewForCount === 48 ? "searcharea__selected-bcount" : ""
                    }`}
                    onClick={() => handleChange(48)}
                >
                    48
                </button>
            </form>
        </div>
    );
};

export default ViewForCount;
