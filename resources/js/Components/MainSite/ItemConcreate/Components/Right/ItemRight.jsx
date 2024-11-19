import React, { useState, useEffect } from "react";
import SizesBlock from "./SizesBlock";
import Starblock from "@/Components/UIGlobal/Starblock/Starblock";
import "./ItemRight.css";

const ItemRight = ({ data, ...props }) => {
    return (
        <div className="itemarea__right">
            <div className="itemarea__title">{data.title}</div>
            <div className="itemarea__model-starblock">
                <Starblock mark={data.mark} type="normal" />
                <div className="itemarea__modelname">{data.model}</div>
            </div>
            <div className="itemarea__priceblock">
                <span className="itemarea__actionprice">
                    {data.actual_price.toFixed(2)}
                </span>{" "}
                /{" "}
                <span className="itemarea__oldprice">
                    {data.normal_price.toFixed(2)}
                </span>{" "}
                бел. руб
            </div>
            <SizesBlock data={data} />

            <div className="itemarea__aboutitem">
                <div className="itemarea__aboutitem-title">
                    Информация о товаре:
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Вид обуви:
                    </span>{" "}
                    {data.category && data.category !== ""
                        ? data.category
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Сезон:{" "}
                    </span>{" "}
                    {data.season && data.season !== ""
                        ? data.season
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Цвет:
                    </span>{" "}
                    {data.colors && data.colors !== ""
                        ? data.colors
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Материал верха:
                    </span>{" "}
                    {data.material_outside && data.material_outside !== ""
                        ? data.material_outside
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Материал подкладки:
                    </span>{" "}
                    {data.material_inside && data.material_inside !== ""
                        ? data.material_inside
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Материал подошвы:
                    </span>{" "}
                    {data.material_sole && data.material_sole !== ""
                        ? data.material_sole
                        : "не указано"}
                </div>
                <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Застежка:
                    </span>{" "}
                    {data.clasptype && data.clasptype !== ""
                        ? data.clasptype
                        : "не указано"}
                </div>
                {/* <div className="itemarea__aboutitem-line">
                    <span className="itemarea__aboutitem-line-title">
                        Высота каблука, мм:
                    </span>{" "}
                    П/ботинки
                </div> */}
            </div>
        </div>
    );
};

export default ItemRight;
