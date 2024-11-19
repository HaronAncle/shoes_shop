import React from "react";

const OrderTable = ({ data, totalSum, totalSumWithDiscount }) => {
    return (
        <div className="orderblock__table">
            <div className="orderblock__subtitle">Ваш заказ:</div>
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Размер</th>
                        <th>Кол-во</th>
                        <th>Цена за 1 шт, руб</th>
                        <th>Всего, руб</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.category + ", арт. " + item.model}</td>
                            <td>{item.size}</td>
                            <td>{item.count}</td>
                            <td>{item.actual_price.toFixed(2)}</td>
                            <td>{item.total_price}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className="colspan-4">
                            Итого
                        </td>
                        <td>{totalSum}</td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="colspan-4">
                            С учетом скидки
                        </td>
                        <td>{totalSumWithDiscount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
