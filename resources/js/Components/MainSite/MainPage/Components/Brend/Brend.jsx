import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InertiaLink } from "@inertiajs/inertia-react";

import "./Brend.css";

const Brend = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/mainpage/brendlist");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="brands">
            <div className="container">
                <div className="brands__div">
                    <div className="brands__title title">Бренды</div>
                    <div className="brands__itemsblock">
                        {data.map((item, index) => (
                            <InertiaLink
                                href={`/brands/${item.search_title}`}
                                className="brands__item item"
                                key={index}
                            >
                                <div className="brands__itemimg">
                                    <img src={item.foto_url} alt="" srcSet="" />
                                </div>
                                <div className="brands__iteminfoblock">
                                    <div className="brands__itemtitle">
                                        {item.title}
                                    </div>
                                    <div className="brands__itemdescription">
                                        {item.description}
                                    </div>
                                </div>
                            </InertiaLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brend;
