import React from "react";
import "./Starblock.css";

const Starblock = ({ mark, type = "reversed", ...props }) => {
    let validMark = parseFloat(mark);

    if (isNaN(validMark) || validMark < 0 || validMark > 5) {
        validMark = 0;
    }

    validMark = Math.round(validMark * 2) / 2;

    const rootClass = `star-rating ${
        type === "reversed" ? "reversed" : "normal"
    }`;

    return (
        <div className={rootClass} {...props}>
            {[...Array(5)].map((_, index) => {
                const starClass =
                    validMark >= index + 1
                        ? "fas fa-star"
                        : validMark >= index + 0.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star";

                return <i key={index} className={starClass}></i>;
            })}
        </div>
    );
};

export default Starblock;
