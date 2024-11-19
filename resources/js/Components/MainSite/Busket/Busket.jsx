import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { InertiaLink } from "@inertiajs/inertia-react";
import axios from "axios";
import ButtonSpecial2 from "@/Components/UIGlobal/ButtonSpecial2/ButtonSpecial2";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./Busket.css";
import { usePage } from "@inertiajs/react";

const QuantityControl = ({ item, index, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(item.count || 1);

    useEffect(() => {
        setQuantity(item.count || 1);
    }, [item.count]);

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(index, newQuantity);
        }
    };

    const handleIncrease = () => {
        if (quantity < item.total_quantity) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onQuantityChange(index, newQuantity);
        }
    };

    return (
        <div className="quantity-control">
            <button
                className={`quantity-button ${
                    quantity === 1 ? "disabled" : ""
                }`}
                onClick={handleDecrease}
            >
                -
            </button>
            <span>{quantity}</span>
            <button
                className={`quantity-button ${
                    quantity >= item.total_quantity ? "disabled" : ""
                }`}
                onClick={handleIncrease}
            >
                +
            </button>
        </div>
    );
};

const Busket = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    let total = 0;
    const user = usePage().props.auth.user;
    let isSimpleUser = false;
    if (
        user?.role_id !== 2 ||
        user?.role_id !== 3 ||
        user?.role_id !== 4 ||
        user?.role_id !== 5
    ) {
        isSimpleUser = true;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const basketItems = Cookies.get("jovattyshopbusket") || "[]";
                const parsedBasketItems = JSON.parse(basketItems);
                const basketItemsString = JSON.stringify(parsedBasketItems);
                const response = await fetch(
                    `/api/busket/getall?busket=${basketItemsString}`
                );
                if (!response.ok) {
                    throw new Error("Ошибка сети");
                }
                const result = await response.json();

                const resultWithCount = result.map((item) => {
                    const matchedItem = parsedBasketItems.find(
                        (bi) => bi.id === item.id && bi.size === item.size
                    );

                    const count = matchedItem?.count || 0;
                    const totalQuantity =
                        item.total_quantity || item.total_quntity || 0;
                    return {
                        ...item,
                        count: count > totalQuantity ? totalQuantity : count,
                        addedDate:
                            matchedItem?.addedDate || new Date().toISOString(),
                        updatedDate:
                            matchedItem?.updatedDate ||
                            new Date().toISOString(),
                    };
                });

                setData(
                    resultWithCount.sort(
                        (a, b) => new Date(a.addedDate) - new Date(b.addedDate)
                    )
                );
            } catch (error) {
                console.error("Ошибка:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRemoveItem = (index) => {
        const basketItems = Cookies.get("jovattyshopbusket") || "[]";
        const parsedBasketItems = JSON.parse(basketItems);

        const updatedBasketItems = parsedBasketItems.filter(
            (item, i) => !(i === index && item.size === data[index].size)
        );
        Cookies.set("jovattyshopbusket", JSON.stringify(updatedBasketItems));
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleQuantityChange = (index, newQuantity) => {
        const updatedData = [...data];
        updatedData[index].count = newQuantity;
        updatedData[index].updatedDate = new Date().toISOString();
        setData(updatedData);

        const basketItems = Cookies.get("jovattyshopbusket") || "[]";
        const parsedBasketItems = JSON.parse(basketItems);
        parsedBasketItems[index].count = newQuantity;
        parsedBasketItems[index].updatedDate = new Date().toISOString();
        Cookies.set("jovattyshopbusket", JSON.stringify(parsedBasketItems));
    };

    data.forEach((item) => {
        total += item.actual_price * (item.count || 1);
    });

    total = total.toFixed(2);

    return (
        <div className="busket">
            <div className="container">
                <div className="busket__div">
                    <div className="busket__itemsblock">
                        {loading ? (
                            <Loading />
                        ) : Array.isArray(data) && data.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Изображение</th>
                                        <th>Название</th>
                                        <th>Цена за 1 шт.</th>
                                        <th>Кол-во</th>
                                        <th>Всего</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={item.url}
                                                    alt={item.title}
                                                />
                                            </td>
                                            <td>
                                                {item.category +
                                                    ", арт. " +
                                                    item.model +
                                                    ", " +
                                                    item.size +
                                                    " размер "}
                                            </td>
                                            <td>
                                                {item.actual_price.toFixed(2)}{" "}
                                                руб.
                                            </td>
                                            <td>
                                                <QuantityControl
                                                    item={item}
                                                    index={index}
                                                    onQuantityChange={
                                                        handleQuantityChange
                                                    }
                                                />
                                            </td>
                                            <td>
                                                {(
                                                    item.actual_price *
                                                    (item.count || 0)
                                                ).toFixed(2)}{" "}
                                                руб.
                                            </td>
                                            <td
                                                className="trash-icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveItem(index);
                                                }}
                                            >
                                                🗑️
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-items-message">Нет товаров</div>
                        )}
                    </div>

                    {loading ? (
                        <div></div>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        <div className="busket__totalpriceblock">
                            {"Итого:  "}
                            <b>{total} руб.</b>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className="busket__downmenu">
                        <ButtonSpecial2 href={`/search`}>
                            Продолжить покупки
                        </ButtonSpecial2>
                        {loading ? (
                            <div></div>
                        ) : Array.isArray(data) &&
                          data.length > 0 &&
                          isSimpleUser ? (
                            <ButtonSpecial2 href={`/busket/order`}>
                                Оформить заказ
                            </ButtonSpecial2>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Busket;
