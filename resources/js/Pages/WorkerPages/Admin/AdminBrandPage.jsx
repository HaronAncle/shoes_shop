import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmBrendBlock from "@/Components/Workers/Admin/AdmBrend/AdmBrendBlock";

const AdminBrandPage = () => {
    return (
        <PanelLayout>
            <Head title="Управления брендами" />
            <AdmBrendBlock />
        </PanelLayout>
    );
};

export default AdminBrandPage;
