import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InertiaLink } from "@inertiajs/inertia-react";
import ButtonSpecial1 from "./../../../../UIGlobal/ButtonSpecial1/ButtonSpecial1";
import ItemInSearch from "./../../../../UIGlobal/ItemInSearch/ItemInSearch";

import "./ItemLine.css";

const ItemLine = (props) => {
    const { hrefFor, hrefName } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("api/mainpage/categoruline", {
                    params: {
                        hrefFor: hrefFor,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [hrefFor]);

    return (
        <div className="categoryline">
            <div className="container">
                <div className="categoryline__div">
                    <div className="categoryline__title subtitle">
                        {hrefName}
                    </div>
                    <div className="categoryline__itemblock">
                        {data.map((item, index) => (
                            <ItemInSearch
                                key={index}
                                data={item}
                                typenum={1}
                                hrefFor={hrefFor}
                            />
                        ))}
                    </div>
                    <div className="categoryline__buttonblock">
                        <ButtonSpecial1 href={`/${hrefFor}`}>
                            {" "}
                            Посмотреть еще
                        </ButtonSpecial1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemLine;
