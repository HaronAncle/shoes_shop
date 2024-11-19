import axios from "axios";
import PostavkiManager from "./PostavkiManager/PostavkiManager";

import "./../Admin.css";

const AdmPostavkiBlock = () => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Контроль количества</div>
                <div className="panelblock__body">
                    <PostavkiManager />
                </div>
            </div>
        </div>
    );
};

export default AdmPostavkiBlock;
