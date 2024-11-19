import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardOrderTable.css";

const DashboardOrderTable = ({ orders, onOrderClick }) => {
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}.${month}.${year} в ${hours}:${minutes}`;
    };

    return (
        <div className="table-responsive">
            <table className="dashboardorder__table table table-striped">
                <thead>
                    <tr>
                        <th>№ заказа</th>
                        <th>Дата</th>
                        <th className="d-none d-md-table-cell">Кол-во пар</th>
                        <th>Статус</th>
                        <th>Общая сумма</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_info.id}>
                            <td>{order.order_info.id}</td>
                            <td>
                                {formatDateTime(order.order_info.created_at)}
                            </td>
                            <td className="d-none d-md-table-cell">
                                {order.order_info.total_items}
                            </td>
                            <td>{order.order_info.status_title}</td>
                            <td>{order.order_info.total_price}</td>
                            <td>
                                <button
                                    className="dashboardorder__button"
                                    onClick={() => onOrderClick(order)}
                                >
                                    Больше
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardOrderTable;
