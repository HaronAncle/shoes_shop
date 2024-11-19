import React, { useEffect, useState } from "react";
import "./Radio.css";

function Radio(props) {
    return <input className="form-radio-input" type="radio" {...props} />;
}
export default Radio;
