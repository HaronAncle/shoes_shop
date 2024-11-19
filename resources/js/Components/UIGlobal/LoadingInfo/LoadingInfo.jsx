import React from "react";
import Loading from "../Loading/Loading";
const LoadingInfo = () => (
    <div className="loading-info-overlay">
        <div className="loading-info-content">
            <Loading />
            <p>Идет обработка запроса...</p>
        </div>
    </div>
);

export default LoadingInfo;
