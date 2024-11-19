import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { InertiaLink } from "@inertiajs/inertia-react";

import "./Banners.css";

const Banners = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/mainpage/banners");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="banners">
            <div className="container">
                <div className="banners__div">
                    <div className="banners__up">
                        <div
                            id="carouselBannersIndicators"
                            className="carousel slide"
                            data-bs-ride="carousel"
                            data-bs-interval="7000"
                        >
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselBannersIndicators"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselBannersIndicators"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselBannersIndicators"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>
                            <div className="carousel-inner">
                                {data.map((item, index) => (
                                    <InertiaLink
                                        className={`carousel-item ${
                                            index === 0 ? "active" : ""
                                        }`}
                                        key={index}
                                        href={`/states/${item.id}`}
                                    >
                                        <img
                                            src={`${item.foto_url}`}
                                            className="d-block w-100"
                                            alt="..."
                                        />
                                    </InertiaLink>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselBannersIndicators"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Предыдущая
                                </span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselBannersIndicators"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">
                                    Следующая
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banners;
