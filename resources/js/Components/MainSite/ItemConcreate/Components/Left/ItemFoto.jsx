import React, { useState } from "react";
import "./ItemFoto.css";
import Loading from "@/Components/UIGlobal/Loading/Loading";

const ItemFoto = ({ hreffoto, ...props }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="itemarea__fotosblock">
            {loading && (
                <div className="itemarea__loading">
                    <Loading size="md" />
                </div>
            )}
            <div
                className="itemarea__fotosview"
                style={{ display: loading ? "none" : "block" }}
            >
                <img
                    src={hreffoto}
                    alt=""
                    onLoad={handleImageLoad} // Обработчик загрузки изображения
                />
            </div>
        </div>
    );
};

export default ItemFoto;
