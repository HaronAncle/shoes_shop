import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialsManager from "./MaterialManager/MaterialManager";

import "./../Admin.css";

const AdmMaterialsBlock = ({ materialType = "", ...props }) => {
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Материал подкладки</div>
                <div className="panelblock__body">
                    <MaterialsManager />
                </div>
            </div>
            <div className="panelblock">
                <div className="panelblock__title">Материал верха</div>
                <div className="panelblock__body">
                    <MaterialsManager />
                </div>
            </div>
            <div className="panelblock">
                <div className="panelblock__title">Материал подошвы</div>
                <div className="panelblock__body">
                    <MaterialsManager />
                </div>
            </div>
            <div className="panelblock">
                <div className="panelblock__title">Тип застежки</div>
                <div className="panelblock__body">
                    <MaterialsManager />
                </div>
            </div>
        </div>
    );
};

export default AdmMaterialsBlock;
