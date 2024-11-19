import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ size = "sm" }) => {
    let spinnerClass = styles.spinnerSmall;

    switch (size) {
        case "md":
            spinnerClass = styles.spinnerMedium;
            break;
        case "lg":
            spinnerClass = styles.spinnerLarge;
            break;
        default:
            spinnerClass = styles.spinnerSmall;
            break;
    }

    return (
        <div className={styles.spinnerContainer}>
            <div
                className={`spinner-border text-secondary ${spinnerClass}`}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
