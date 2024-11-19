import React, { useState, useEffect } from "react";
import axios from "axios";
import { InertiaLink } from "@inertiajs/inertia-react";

import NewsDate from "./NewsDate/NewsDate";

import "./News.css";

const News = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/states/getstatelist");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="newsarea">
            <div className="container">
                <div className="newsarea__div">
                    <div className="newsarea__title">Новости</div>
                    <div className="newsarea__block">
                        {data.map((item, index) => (
                            <InertiaLink
                                className="newsarea__item"
                                href={`/states/state/${item.id}`}
                                key={index}
                            >
                                <div className="newsarea__date">
                                    <NewsDate
                                        dateTimeString={item.created_at}
                                    />
                                </div>
                                <div className="newsarea__foto">
                                    <img src={item.foto_url} alt="" />
                                </div>
                                <div className="newsarea__itemname">
                                    {item.title}
                                </div>
                            </InertiaLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
