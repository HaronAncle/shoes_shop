import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderTable.css";

const OrderTable = ({ initialOrders, orderTypes, onOrderClick }) => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 30;

    useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}.${month}.${year} в ${hours}:${minutes}`;
    };

    const formatUserInfo = (order_concreate) => {
        return `${formatDateTime(order_concreate.created_at)}, ${
            order_concreate.first_name
        } ${order_concreate.last_name} ${
            order_concreate.middle_name ? order_concreate.middle_name : ""
        }, телефон: ${order_concreate.phone}, адрес: ${
            order_concreate.adres
        } (${order_concreate.userdelivery_title}), тип оплаты: ${
            order_concreate.payment_title
        }`;
    };

    const updateStatus = (orderId, statusId, statusTitle) => {
        axios
            .post(`/api/workpanel/admin/orders/${orderId}`, {
                status_id: statusId,
            })
            .then((response) => {
                console.log("Status updated successfully:", response.data);
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.order_info.id === orderId
                            ? {
                                  ...order,
                                  order_info: {
                                      ...order.order_info,
                                      status_title: statusTitle,
                                  },
                              }
                            : order
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error updating the status:", error);
            });
    };

    const deleteOrder = (orderId) => {
        axios
            .delete(`/api/workpanel/admin/orders/${orderId}`)
            .then((response) => {
                console.log("Order deleted successfully:", response.data);
                setOrders((prevOrders) =>
                    prevOrders.filter(
                        (order) => order.order_info.id !== orderId
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error deleting the order:", error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Сброс на первую страницу при новом поиске
    };

    const filteredOrders = orders.filter((order) =>
        order.order_info.id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="order-table-container">
            <input
                type="text"
                className="order-search-input"
                placeholder="Поиск по номеру"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="table-responsive">
                <table className="dashboardorder__table table table-striped">
                    <thead>
                        <tr>
                            <th>№ заказа</th>
                            <th>Информация заказа</th>
                            <th className="d-none d-md-table-cell">
                                Кол-во пар
                            </th>
                            <th>Статус</th>
                            <th>Общая сумма</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((order) => (
                                <tr key={order.order_info.id}>
                                    <td>{order.order_info.id}</td>
                                    <td>{formatUserInfo(order.order_info)}</td>
                                    <td className="d-none d-md-table-cell">
                                        {order.order_info.total_items}
                                    </td>
                                    <td>
                                        <select
                                            className="order-status-select"
                                            value={
                                                order.order_info.status_title
                                            }
                                            name="OrderType"
                                            onChange={(e) => {
                                                const selectedStatus =
                                                    orderTypes.find(
                                                        (type) =>
                                                            type.title ===
                                                            e.target.value
                                                    );
                                                if (selectedStatus) {
                                                    updateStatus(
                                                        order.order_info.id,
                                                        selectedStatus.id,
                                                        selectedStatus.title
                                                    );
                                                }
                                            }}
                                        >
                                            {orderTypes.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.title}
                                                >
                                                    {type.title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{order.order_info.total_price}</td>
                                    <td>
                                        <button
                                            className="dashboardorder__button btn btn-primary"
                                            onClick={() => onOrderClick(order)}
                                        >
                                            Больше
                                        </button>
                                        {["Отменен", "Возврат"].includes(
                                            order.order_info.status_title
                                        ) && (
                                            <button
                                                className="dashboardorder__button btn btn-danger ml-2"
                                                onClick={() =>
                                                    deleteOrder(
                                                        order.order_info.id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-results">
                                    Ничего не найдено
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            className={`pagination-button ${
                                page === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    );
                })}
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
};

export default OrderTable;
