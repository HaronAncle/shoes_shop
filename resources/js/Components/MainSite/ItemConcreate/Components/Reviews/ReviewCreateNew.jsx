import React, { useState } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import Textarea from "./Textarea";
import "./ReviewCreateNew.css";
import axios from "axios";
import ButtonSpecial4 from "@/Components/UIGlobal/ButtonSpecial4/ButtonSpecial4";

const ReviewCreateNew = ({ show, onClose, refreshReviews }) => {
    const [mark, setMark] = useState(0);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({ mark: "", description: "" });
    const maxDescriptionLength = 2500;

    const handleMarkClick = (index) => {
        setMark(mark === index ? 0 : index);
    };

    const validateFields = () => {
        const errors = {};
        if (mark === 0) {
            errors.mark = "Поле должно быть заполнено.";
        }
        if (description.trim().length <= 3) {
            errors.description = "Поле должно быть заполнено.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setMark(0);
        setDescription("");
        setErrors({ mark: "", description: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const itemId = window.location.pathname.split("/").pop();
        try {
            const itemResponse = await axios.get(
                `/api/check/check-item/${itemId}`
            );
            const userResponse = await axios.get("/api/check/check-user");

            if (userResponse.data.exists && itemResponse.data.exists) {
                const token = document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content");

                await axios.post(
                    "/api/reviews",
                    {
                        mark,
                        description,
                        item_id: itemId,
                        user_id: userResponse.data.user_id,
                    },
                    {
                        headers: {
                            "X-CSRF-TOKEN": token,
                        },
                    }
                );
                resetForm();
                refreshReviews();
                onClose();
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    server: "Произошла ошибка: Пользователь или товар не найден.",
                }));
            }
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    ...error.response.data.errors,
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    server: "Произошла ошибка при отправке данных.",
                }));
            }
        }
    };

    return (
        <Modal
            show={show}
            onClose={() => {
                resetForm();
                onClose();
            }}
            maxWidth="md"
        >
            <div className="reviewcreate__modal-header">
                <h5 className="reviewcreate__modal-title">Оставить отзыв</h5>
                <button
                    type="button"
                    className="reviewcreate__close"
                    aria-label="Close"
                    onClick={() => {
                        resetForm();
                        onClose();
                    }}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="reviewcreate__modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="reviewcreate__form-group">
                        <label>Оценка</label>
                        <div className="reviewcreate__star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`fa fa-star reviewcreate__fa-star ${
                                        star <= mark ? "checked" : ""
                                    }`}
                                    onClick={() => handleMarkClick(star)}
                                ></span>
                            ))}
                        </div>
                        {errors.mark && (
                            <small className="error">{errors.mark}</small>
                        )}
                    </div>
                    <div className="reviewcreate__form-group">
                        <label>Комментарий</label>
                        <Textarea
                            value={description}
                            maxLength={maxDescriptionLength}
                            onChange={setDescription}
                        />
                        {errors.description && (
                            <small className="error">
                                {errors.description}
                            </small>
                        )}
                    </div>
                    <ButtonSpecial4 type="submit">Отправить</ButtonSpecial4>
                </form>
            </div>
        </Modal>
    );
};

export default ReviewCreateNew;
