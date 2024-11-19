import axios from "axios";
import OrderManager from "./OrderManager/OrderManager";
import "./../Admin.css";

const AdmOrderBlock = ({ materialType = "", ...props }) => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Заказы пользователей</div>
                <div className="panelblock__body">
                    <OrderManager />
                </div>
            </div>
        </div>
    );
};

export default AdmOrderBlock;
