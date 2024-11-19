import axios from "axios";
import BrandManager from "./BrandManager/BrandManager";

import "./../Admin.css";

const AdmBrendBlock = ({ materialType = "", ...props }) => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Бренды</div>
                <div className="panelblock__body">
                    <BrandManager />
                </div>
            </div>
        </div>
    );
};

export default AdmBrendBlock;
