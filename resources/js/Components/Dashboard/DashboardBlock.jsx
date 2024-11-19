import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardOrder from "./DashboardOrder/DashboardOrder";
import DashboardMyInfo from "./DashboardMyInfo/DashboardMyInfo";
import { usePage } from "@inertiajs/react";
import "./DashboardBlock.css";

const DashboardBlock = () => {
    const user = usePage().props.auth.user;
    let isSimpleUser = false;
    if (user.role_id === 1) isSimpleUser = true;

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {isSimpleUser && (
                    <div className="dashboardblock">
                        <DashboardOrder />
                    </div>
                )}
                <div className="dashboardblock">
                    <DashboardMyInfo />
                </div>
            </div>
        </div>
    );
};

export default DashboardBlock;
