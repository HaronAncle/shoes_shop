import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ButtonSpecial1 from "../../../../UIGlobal/ButtonSpecial1/ButtonSpecial1";

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
                    <div className="likeproduct__title">Акции</div>
                    <div className="likeproduct__block">
                        <Link className="likeproduct__item" href="">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </Link>
                        <a className="likeproduct__item">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </a>
                        <a className="likeproduct__item">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </a>
                        <a className="likeproduct__item">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </a>
                        <a className="likeproduct__item">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </a>
                        <a className="likeproduct__item">
                            <div className="likeproduct__date">
                                14 апреля 2024
                            </div>
                            <div className="likeproduct__foto">
                                <img src="/x/33/img/temp.jpg" alt="" />
                            </div>
                            <div className="likeproduct__itemname">
                                Акция в честь нового поступления
                            </div>
                        </a>
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
