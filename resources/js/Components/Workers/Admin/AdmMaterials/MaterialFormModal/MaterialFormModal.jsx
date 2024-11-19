import React, { useState, useEffect } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import "./MaterialFormModal.css";

const MaterialFormModal = ({ show, onClose, onSave, type, material }) => {
    const [title, setTitle] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (material) {
            setTitle(material.title);
            setSearchTitle(material.search_title);
        } else {
            setTitle("");
            setSearchTitle("");
        }
    }, [material]);

    const validate = () => {
        const newErrors = {};
        const titleRegex = /^[a-zA-Z\u0400-\u04FF()]+$/;
        const searchTitleRegex = /^[a-zA-Z()]+$/;

        if (!title || title.length < 3 || !titleRegex.test(title)) {
            newErrors.title =
                "Заголовок должен содержать только буквы и круглые скобки, и быть не менее 3 символов.";
        }
        if (
            !searchTitle ||
            searchTitle.length < 3 ||
            !searchTitleRegex.test(searchTitle)
        ) {
            newErrors.searchTitle =
                "Поисковый заголовок должен содержать только английские буквы и круглые скобки, и быть не менее 3 символов.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave({ title, searchTitle });
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <form onSubmit={handleSubmit}>
                <div className="modal-block">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {type === "edit"
                                ? "Редактировать материал"
                                : "Добавить материал"}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={onClose}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {errors.submit && (
                            <div className="form-error">{errors.submit}</div>
                        )}
                        <div className="form-group">
                            <label>Заголовок</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && (
                                <div className="field-error">
                                    {errors.title}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Поисковый заголовок</label>
                            <input
                                type="text"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                            />
                            {errors.searchTitle && (
                                <div className="field-error">
                                    {errors.searchTitle}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                            {type === "edit"
                                ? "Сохранить изменения"
                                : "Добавить"}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default MaterialFormModal;
