import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./SizeBlock.css";

const SizesBlock = ({ data, ...props }) => {
    const [inBasket, setInBasket] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const existingCookie = Cookies.get("jovattyshopbusket");
        if (existingCookie) {
            const existingBasket = JSON.parse(existingCookie);
            const existingIndex = existingBasket.findIndex(
                (item) => item.id === data.id && item.size === selectedSize
            );
            if (existingIndex !== -1) {
                setInBasket(true);
            } else {
                setInBasket(false);
            }
        }
    }, [data.id, selectedSize]);

    const handleAddToBasket = () => {
        if (selectedSize) {
            const productCharacteristics = {
                id: data.id,
                size: selectedSize,
                count: 1,
                model: data.model,
                addedDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            };

            const existingCookie = Cookies.get("jovattyshopbusket");
            const existingBasket = existingCookie
                ? JSON.parse(existingCookie)
                : [];

            const existingIndex = existingBasket.findIndex(
                (item) =>
                    item.id === productCharacteristics.id &&
                    item.size === selectedSize
            );

            if (existingIndex !== -1) {
                console.log("Модель уже в корзине");
                setInBasket(true);
            } else {
                const updatedBasket = [
                    ...existingBasket,
                    productCharacteristics,
                ];
                Cookies.set(
                    "jovattyshopbusket",
                    JSON.stringify(updatedBasket),
                    {
                        expires: 7,
                    }
                );
                setInBasket(true);
            }
        }
    };

    let sizes = data.sizes;
    sizes = sizes.split(", ");

    return (
        <form>
            <div className="itemarea__sizetable">
                <div className="itemarea__sizetable-title">Выберите размер</div>
                <div className="itemarea__sizetable-sizeblock">
                    <div className="radio-group">
                        {sizes.map((size, index) => (
                            <label className="radio-block" key={index}>
                                <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    onChange={() => setSelectedSize(size)}
                                    checked={selectedSize === size}
                                />
                                <span className="radio-block-content">
                                    {size}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="itemarea__buttonsend"
                onClick={handleAddToBasket}
                disabled={!selectedSize || inBasket}
            >
                {inBasket ? "Уже в корзине" : "Добавить в корзину"}
            </button>
        </form>
    );
};

export default SizesBlock;
