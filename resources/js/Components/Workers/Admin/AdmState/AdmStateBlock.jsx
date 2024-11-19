import axios from "axios";
import StateManager from "./StateManager/StateManager";

import "./../Admin.css";

const AdmStateBlock = ({ materialType = "", ...props }) => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Статьи</div>
                <div className="panelblock__body">
                    <StateManager />
                </div>
            </div>
        </div>
    );
};

export default AdmStateBlock;
