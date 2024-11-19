import React from "react";
import Reviews from "./Components/Reviews/Reviews";
import ItemRight from "./Components/Right/ItemRight";
import ItemLeft from "./Components/Left/ItemLeft";

import "./ItemConcreate.css";

const ItemConcreate = ({ data, ...props }) => {
    return (
        <div className="itemarea">
            <div className="container">
                <div className="itemarea__div">
                    {data ? (
                        <div>
                            <div className="itemarea__iteminfo">
                                <ItemLeft data={data} />
                                <ItemRight data={data} />
                            </div>
                            <Reviews id={data.id} />
                        </div>
                    ) : (
                        <p>Товар не найден</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemConcreate;
