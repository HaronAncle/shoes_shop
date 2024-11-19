import React from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";

const NotificationModal = ({ show, onClose, notification }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="notification-modal__header">
                <h5>Уведомление</h5>
            </div>
            <div className="notification-modal__body">
                <p>{notification.message}</p>
                <p>{notification.timestamp}</p>
            </div>
            <div className="notification-modal__footer">
                <button className="btn btn-secondary" onClick={onClose}>
                    Назад
                </button>
            </div>
        </Modal>
    );
};

export default NotificationModal;
