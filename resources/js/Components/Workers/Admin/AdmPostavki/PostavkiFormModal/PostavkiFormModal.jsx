import React, { useState } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import "./PostavkiFormModal.css";

const PostavkiFormModal = ({ show, onClose, type, item, onSave }) => {
    const sizes = JSON.parse("[" + item.sizesinfofull + "]");
    const [counts, setCounts] = useState(
        sizes.map((size) => size.total_storage)
    );

    const handleIncrease = (index) => {
        setCounts(counts.map((count, i) => (i === index ? count + 1 : count)));
    };

    const handleDecrease = (index) => {
        setCounts(
            counts.map((count, i) =>
                i === index && count > sizes[index].total_ordered
                    ? count - 1
                    : count
            )
        );
    };

    const handleSubmit = () => {
        const formData = sizes.map((size, index) => ({
            size: size.size,
            total_storage: counts[index],
        }));

        onSave(formData);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="xl">
            <div className="modal-block">
                <div className="modal-header">
                    <h5 className="modal-title">Контроль количества</h5>
                    <button type="button" className="close" onClick={onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Данные:</label>
                        <p>
                            {item.title +
                                ", модель " +
                                item.model +
                                ", бренд " +
                                item.brand}
                        </p>
                    </div>

                    <div className="form-group">
                        {item.urlimages ? (
                            <img
                                src={item.urlimages}
                                alt="Preview"
                                className="image-preview"
                            />
                        ) : (
                            <div className="image-placeholder">Изображение</div>
                        )}
                    </div>

                    <div className="form-group">
                        <div className="sizes-group">
                            {sizes.map((size, index) => (
                                <div key={size.size} className="size-block">
                                    <p className="count-size">
                                        Размер: {size.size}
                                    </p>
                                    <div className="count-controls">
                                        <button
                                            onClick={() =>
                                                handleDecrease(index)
                                            }
                                            disabled={
                                                counts[index] <=
                                                size.total_ordered
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={counts[index]}
                                            readOnly
                                        />
                                        <button
                                            onClick={() =>
                                                handleIncrease(index)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p>
                                        Доступное количество: {size.total_count}
                                    </p>
                                    <p>Всего заказано: {size.total_ordered}</p>
                                    <p>На складе: {size.total_storage}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PostavkiFormModal;
