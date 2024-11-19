import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderFormModal from "../OrderFormModal/OrderFormModal";
import OrderTable from "./OrderTable";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./OrderManager.css";
import { usePage } from "@inertiajs/react";

const OrderManager = () => {
    const user = usePage().props.auth.user;
    const [orders, setOrders] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/workpanel/admin/orders");
                setOrders(response.data);
                if (response.data.length === 0) {
                    setError(true);
                }
            } catch (error) {
                console.error("Error fetching orders", error);
                setError(true);
            } finally {
            }
        };
        const fetchOrderTypes = async () => {
            try {
                const response = await axios.get(
                    "/api/workpanel/admin/getOrdersStatuses"
                );
                setOrderTypes(response.data);
                if (response.data.length === 0) {
                    setError(true);
                }
                fetchOrders();
            } catch (error) {
                console.error("Error fetching order types", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderTypes();
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="dashboardorder__container">
            <div className="dashboardorder__orders">
                {loading ? (
                    <div className="dashboardorder__loading">
                        <Loading />
                    </div>
                ) : error ? (
                    <p className="dashboardorder__noorder"> Нет заказов </p>
                ) : (
                    <OrderTable
                        initialOrders={orders}
                        orderTypes={orderTypes}
                        onOrderClick={openModal}
                    />
                )}
            </div>
            {selectedOrder && (
                <OrderFormModal
                    order={selectedOrder}
                    isOpen={modalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default OrderManager;
