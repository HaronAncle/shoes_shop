import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminPageBlock from "@/Components/Workers/Admin/AdmPage/AdmPageBlock";
import AdmOrderBlock from "@/Components/Workers/Admin/AdmOrder/AdmOrderBlock";
import AdmItemBlock from "@/Components/Workers/Admin/AdmItem/AdmItemBlock";

const AdminPage = () => {
    return (
        <PanelLayout>
            <Head title="Панель администратора" />
            <AdmOrderBlock />
        </PanelLayout>
    );
};

export default AdminPage;
