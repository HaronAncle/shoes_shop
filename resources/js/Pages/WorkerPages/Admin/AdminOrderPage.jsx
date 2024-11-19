import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmOrderBlock from "@/Components/Workers/Admin/AdmOrder/AdmOrderBlock";

const AdminOrderPage = () => {
    return (
        <PanelLayout>
            <Head title="Управление заказами" />
            <AdmOrderBlock />
        </PanelLayout>
    );
};

export default AdminOrderPage;
