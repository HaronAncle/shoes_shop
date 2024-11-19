import React, { useState } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./OrderFormModal.css";

const OrderFormModal = ({ order, isOpen, onClose }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="dashboardorder-modal__header">
                <h2>Заказ №{order.order_info.id}</h2>
            </div>
            <div className="dashboardorder-modal__body">
                <div className="dashboardorder-modal__table-container">
                    <table className="dashboardorder-modal__table">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Название</th>
                                <th>Размер</th>
                                <th>Цена за штуку</th>
                                <th>Количество</th>
                                <th>Общая сумма</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <DashboardOrderModalRow
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                            <tr>
                                <td
                                    colSpan="3"
                                    className="dashboardorder-modal__total-label"
                                >
                                    Итого:
                                </td>
                                <td
                                    colSpan="3"
                                    className="dashboardorder-modal__total-amount"
                                >
                                    {order.order_info.total_price} бел. руб
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="dashboardorder-modal__footer">
                <button onClick={onClose} className="dashboardorder__button">
                    Назад
                </button>
            </div>
        </Modal>
    );
};

const DashboardOrderModalRow = ({ item }) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleRowClick = () => {};

    return (
        <tr onClick={handleRowClick} className="dashboardorder-modal__row">
            <td>
                <div className="dashboardorder-modal__image-container">
                    {loading && (
                        <div className="dashboardorder-modal__loading-container">
                            <Loading />
                        </div>
                    )}
                    <img
                        src={item.url}
                        alt={item.title}
                        className={`dashboardorder-modal__image ${
                            loading ? "loading" : ""
                        }`}
                        onLoad={handleImageLoad}
                    />
                </div>
            </td>
            <td>{item.title + ", модель: " + item.model}</td>
            <td>{item.size}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.total_price}</td>
        </tr>
    );
};

export default OrderFormModal;
