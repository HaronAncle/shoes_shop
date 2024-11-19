import React, { useState, useEffect } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import axios from "axios";

const HeaderSubsearchBrendsList = (props) => {
    const { hrefFor } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "/api/maincategory/subsearch/brends",
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
                <InertiaLink href={`/${hrefFor}`}>Бренды</InertiaLink>
            </h2>

            <ul className="header__nav-category-list">
                {data.map((item, index) => (
                    <li key={index} className="header__nav-category-item">
                        <InertiaLink
                            href={`/${hrefFor}?brend[0]=${item.search_title}`}
                        >
                            {item.title}
                        </InertiaLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeaderSubsearchBrendsList;
