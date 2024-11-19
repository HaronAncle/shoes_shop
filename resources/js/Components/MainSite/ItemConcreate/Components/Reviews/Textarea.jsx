import React, { useState } from "react";
import "./Textarea.css";

const Textarea = ({ value, maxLength, onChange }) => {
    const handleInputChange = (e) => {
        let newValue = e.target.value.replace(/\n/g, ""); // Remove newline characters
        if (newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength); // Trim to max length
        }
        onChange(newValue);
    };

    return (
        <div>
            <textarea
                className="textarea__form-control"
                rows={6}
                value={value}
                onChange={handleInputChange}
            ></textarea>
            <small className="textarea__form-text">
                {value.length}/{maxLength} символов
            </small>
        </div>
    );
};

export default Textarea;
