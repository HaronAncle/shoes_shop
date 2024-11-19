import React from "react";

function formatDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];

    const day = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${day} ${month} ${year} в ${hours}:${paddedMinutes}`;

    return formattedDate;
}

const NewsDate = ({ dateTimeString, ...props }) => {
    return <span>{formatDate(dateTimeString)}</span>;
};

export default NewsDate;
