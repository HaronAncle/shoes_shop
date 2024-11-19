import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmStateBlock from "@/Components/Workers/Admin/AdmState/AdmStateBlock";

const AdminStatePage = () => {
    return (
        <PanelLayout>
            <Head title="Управление статьями" />
            <AdmStateBlock />
        </PanelLayout>
    );
};

export default AdminStatePage;
