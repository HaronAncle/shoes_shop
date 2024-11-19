import React, { useState, useEffect } from "react";
import NewsDate from "../NewsDate/NewsDate";

import "./NewConcreate.css";

const NewConcreate = ({ data, ...props }) => {
    return (
        <div className="newsitemarea">
            <div className="container">
                <div className="newsitemarea__div">
                    <div className="newsitemarea__title">{data.title}</div>
                    <div className="newsitemarea__infoblock">
                        <div className="newsitemarea__dateline">
                            <NewsDate dateTimeString={data.created_at} />
                        </div>
                        <div className="newsitemarea__fotoblock">
                            <img
                                className="newsitemarea__foto"
                                src={data.foto_url}
                                alt=""
                                srcSet=""
                            />
                        </div>
                        <div className="newsitemarea__pblock">
                            <p className="newsitemarea__p">{data.statabody}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewConcreate;
