import React, { useEffect, useState } from "react";
import "./Checkbox.css";

function Checkbox({
    queryParams = {},
    option = {},
    index = 0,
    index2 = 0,
    ...props
}) {
    const getValueByKey = (key, valueForCheck) => {
        const cleanKey = (k) => k?.replace(/\[.*?\]/g, "");

        const cleanedKey = cleanKey(key);

        for (const paramKey in queryParams) {
            const cleanedParamKey = cleanKey(paramKey);

            if (cleanedParamKey === cleanedKey) {
                const paramValue = queryParams[paramKey];
                const valuesArray =
                    typeof paramValue === "string"
                        ? paramValue.split(",")
                        : [paramValue];
                if (valuesArray.includes(valueForCheck)) {
                    return true;
                } else return false;
            }
        }
        return false;
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
    };

    useEffect(() => {
        if (option?.namex && option?.search_title) {
            setIsChecked(getValueByKey(option.namex, option.search_title));
        }
    }, [option, queryParams]);

    return (
        <input
            className="form-check-input"
            type="checkbox"
            value={option?.search_title || ""}
            name={`${option?.namex || "default"}[]`}
            id={`f-ch${index}-${index2}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
            {...props}
        />
    );
}

export default Checkbox;
