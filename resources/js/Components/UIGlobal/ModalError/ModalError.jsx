import React from "react";
import Modal from "../Modal/Modal";
import "./ModalError.css";

const ErrorModal = ({ show, onClose, message }) => {
    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="modal-block">
                <div className="modal-header">
                    <h5 className="modal-title">Ошибка</h5>
                    <button type="button" className="close" onClick={onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorModal;
