import React, { useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import axios from "axios";

const HeaderSubsearchList = (props) => {
    const { hrefFor } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "/api/maincategory/subsearch/category",
                    {
                        params: { hrefFor: hrefFor },
                    }
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [hrefFor]);

    return (
        <div className="header__nav-category">
            <h2 className="header__nav-category-heading">
                <InertiaLink href={`/${hrefFor}`}>Все категории</InertiaLink>
            </h2>
            <ul className="header__nav-category-list">
                {data.map((item, index) => (
                    <li key={index} className="header__nav-category-item">
                        <InertiaLink
                            href={`/${hrefFor}?childcategory[]=${item.search_title}`}
                        >
                            {item.title} <small>({item.count})</small>
                        </InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeaderSubsearchList;
