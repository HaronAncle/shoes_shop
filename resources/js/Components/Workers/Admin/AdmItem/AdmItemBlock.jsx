import axios from "axios";
import ItemManager from "./ItemManager/ItemManager";

import "./../Admin.css";

const AdmItemBlock = () => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Товары</div>
                <div className="panelblock__body">
                    <ItemManager />
                </div>
            </div>
        </div>
    );
};

export default AdmItemBlock;
