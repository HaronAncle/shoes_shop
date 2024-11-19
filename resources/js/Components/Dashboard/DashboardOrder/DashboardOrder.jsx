import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardOrderTable from "./DashboardOrderTable";
import DashboardOrderModal from "./DashboardOrderModal";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./DashboardOrder.css";
import { usePage } from "@inertiajs/react";

const DashboardOrder = () => {
    const user = usePage().props.auth.user;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "/api/dashboard/getorderinfo/" + user.id
                );
                setOrders(response.data);
                if (response.data.length === 0) {
                    setError(true);
                }
            } catch (error) {
                console.error("Error fetching orders", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
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
                <h3 className="dashboardorder__title">Заказы</h3>
                {loading ? (
                    <div className="dashboardorder__loading">
                        <Loading />
                    </div>
                ) : error ? (
                    <p className="dashboardorder__noorder">
                        {" "}
                        У вас не было заказов{" "}
                    </p>
                ) : (
                    <DashboardOrderTable
                        orders={orders}
                        onOrderClick={openModal}
                    />
                )}
            </div>
            {selectedOrder && (
                <DashboardOrderModal
                    order={selectedOrder}
                    isOpen={modalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default DashboardOrder;
