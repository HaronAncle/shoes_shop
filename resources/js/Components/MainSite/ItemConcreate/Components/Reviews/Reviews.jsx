import React, { useEffect, useState } from "react";
import ReviewCreateNew from "./ReviewCreateNew";
import Starblock from "@/Components/UIGlobal/Starblock/Starblock";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import ButtonSpecial4 from "@/Components/UIGlobal/ButtonSpecial4/ButtonSpecial4";
import "./Review.css";

const Reviews = ({ id, ...props }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [reviews, setReviews] = useState(null);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/usercheck", {
                    credentials: "include",
                });
                const userData = await response.json();
                setUser(userData);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/model/getreviews?id=${id}`);
            if (!response.ok) {
                throw new Error("Ошибка сети");
            }
            const result = await response.json();
            setReviews(result || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div className="itemarea__reviewblock">
            <div className="itemarea__review-title">Отзывы</div>

            {loadingUser ? (
                <div>Loading user information...</div>
            ) : user ? (
                <>
                    <ButtonSpecial4
                        className="itemarea__review-button"
                        onClick={() => setShowModal(true)}
                    >
                        Написать отзыв
                    </ButtonSpecial4>
                    <ReviewCreateNew
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        refreshReviews={fetchData}
                    />
                </>
            ) : (
                <div className="itemarea__review-subtitle">
                    Для написания отзыва необходимо{" "}
                    <a href="/login" className="href-for-next">
                        авторизоваться
                    </a>{" "}
                    на сайте.
                </div>
            )}

            <form className="itemarea__rewiew-form"></form>
            <div className="itemarea__review-selfblock">
                {loadingReviews ? (
                    <div>Loading...</div>
                ) : Array.isArray(reviews) && reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div className="itemarea__reviewitem" key={index}>
                                <div className="itemarea__reviewitem-up">
                                    <div className="itemarea__reviewitem-username">
                                        {review.user_name}
                                    </div>
                                    <Starblock
                                        mark={review.mark}
                                        type="normal"
                                    />
                                </div>
                                <div className="itemarea__reviewitem-middle">
                                    <span className="itemarea__reviewitem-middle-subblock">
                                        Артикул: {review.model}
                                    </span>
                                    <span className="itemarea__reviewitem-middle-subblock">
                                        Дата:{" "}
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="itemarea__reviewitem-down">
                                    {review.description}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Нет отзывов на данный товар</div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
