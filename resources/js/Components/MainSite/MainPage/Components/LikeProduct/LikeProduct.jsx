import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InertiaLink } from "@inertiajs/inertia-react";

import ButtonSpecial1 from "@/Components/UIGlobal/ButtonSpecial1/ButtonSpecial1";
import NewsDate from "@/Components/MainSite/News/NewsDate/NewsDate";

import "./LikeProduct.css";

const LikeProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "api/mainpage/likeproductline"
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="likeproduct">
            <div className="container">
                <div className="likeproduct__div">
                    <div className="likeproduct__title">Новости</div>
                    <div className="likeproduct__block">
                        {data.map((item, index) => (
                            <InertiaLink
                                key={index}
                                className="likeproduct__item"
                                href={`/states/${item.id}`}
                            >
                                <div className="likeproduct__date">
                                    <NewsDate
                                        dateTimeString={item.created_at}
                                    />
                                </div>
                                <div className="likeproduct__foto">
                                    <img
                                        src={`\\storage\\images\\news\\${item.foto_url}`}
                                        alt=""
                                    />
                                </div>
                                <div className="likeproduct__itemname">
                                    {item.title}
                                </div>
                            </InertiaLink>
                        ))}
                    </div>
                    <div className="likeproduct__buttons">
                        <ButtonSpecial1> Посмотреть еще</ButtonSpecial1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikeProduct;
