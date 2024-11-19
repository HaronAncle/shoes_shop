import React, { useState, useEffect } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import "./StateFormModal.css";

const StateFormModal = ({ show, onClose, onSave, type, state }) => {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (state) {
            setTitle(state.title);
            setDescription(state.statabody);
            setImage(null);
            setImagePreview(state.foto_url);
            setImageChanged(false);
        } else {
            setTitle("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            setImageChanged(false);
        }
    }, [state]);

    const validate = () => {
        const newErrors = {};

        if (!title || title.length < 3 || title.length > 80) {
            newErrors.title = "Заголовок должен быть от 3 до 80 символов.";
        }

        if (!description) {
            newErrors.description = "Описание не может быть пустым.";
        }
        if (imageChanged && !image && type === "add") {
            newErrors.image = "Изображение обязательно.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("imageChanged", imageChanged);

            if (imageChanged && image) {
                formData.append("image", image);
            }
            onSave(formData);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setImageChanged(true); // Image has been changed
        } else {
            setImage(null);
            setImagePreview(null);
            setImageChanged(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <form onSubmit={handleSubmit}>
                <div className="modal-block">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {type === "edit"
                                ? "Редактировать карточку"
                                : "Добавить статью"}
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
                            <label>Изображение</label>
                            <label className="image-upload">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="image-preview"
                                    />
                                ) : (
                                    <div className="image-placeholder">
                                        Вставьте изображение
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                            {errors.image && (
                                <div className="field-error">
                                    {errors.image}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Описание</label>
                            <textarea
                                rows="7"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && (
                                <div className="field-error">
                                    {errors.description}
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

export default StateFormModal;
