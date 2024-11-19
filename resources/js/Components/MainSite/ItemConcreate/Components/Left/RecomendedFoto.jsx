import { InertiaLink } from "@inertiajs/inertia-react";
import React, { useState, useEffect, useRef } from "react";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./RecomendedFoto.css";

const RecomendedFoto = ({ id }) => {
    const [data, setData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/model/getrecomended?id=${id}`
                );
                if (!response.ok) {
                    throw new Error("Ошибка сети");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [id]);

    const [loadingImages, setLoadingImages] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleImageLoaded = (index) => {
        setLoadingImages((prev) => ({
            ...prev,
            [index]: false,
        }));
    };

    const handleMouseDown = (e) => {
        if (sliderRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - sliderRef.current.offsetLeft);
            setScrollLeft(sliderRef.current.scrollLeft);
        }
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scroll speed as needed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e) => {
        if (sliderRef.current && isMouseOver) {
            e.preventDefault();
            if (!isScrollingRef.current) {
                isScrollingRef.current = true;
                const scrollStep = e.deltaY;

                const smoothScroll = () => {
                    if (sliderRef.current) {
                        sliderRef.current.scrollLeft += scrollStep;
                    }
                    isScrollingRef.current = false;
                };

                requestAnimationFrame(smoothScroll);
            }
        }
    };

    useEffect(() => {
        const handleWindowWheel = (e) => {
            if (isMouseOver) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", handleWindowWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWindowWheel);
        };
    }, [isMouseOver]);

    return (
        <div className="itemarea__likethis">
            <div className="itemarea__likethis-title">
                Вам также может понравиться:
            </div>
            {loadingData || error ? (
                <Loading size="md" />
            ) : (
                <div
                    className="itemarea__likethis-slider"
                    ref={sliderRef}
                    onMouseEnter={() => setIsMouseOver(true)}
                    onMouseLeave={() => {
                        setIsMouseOver(false);
                        handleMouseLeave();
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onWheel={handleWheel}
                >
                    {data.map((item, index) => (
                        <InertiaLink
                            href={"/search/model/" + item.id}
                            key={index}
                            className="itemarea__likethis-slider-item"
                        >
                            <div className="itemarea__likethis-slider-image-wrapper">
                                {loadingImages[index] && (
                                    <div className="itemarea__likethis-slider-loading">
                                        <Loading size="sm" />{" "}
                                    </div>
                                )}
                                <img
                                    className={`itemarea__likethis-slider-image ${
                                        loadingImages[index] ? "hidden" : ""
                                    }`}
                                    src={item.urlimages}
                                    alt={item.title}
                                    onLoad={() => handleImageLoaded(index)}
                                />
                            </div>
                            <div className="itemarea__likethis-slider-name">
                                {item.category || "Обувь"}
                            </div>
                            <div className="itemarea__likethis-slider-price">
                                {item.actual_price.toFixed(2)} бел. руб.
                            </div>
                        </InertiaLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecomendedFoto;
