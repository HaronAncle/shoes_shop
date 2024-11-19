import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmItemBlock from "@/Components/Workers/Admin/AdmItem/AdmItemBlock";

const AdminItemPage = () => {
    return (
        <PanelLayout>
            <Head title="Управление карточками" />
            <AdmItemBlock />
        </PanelLayout>
    );
};

export default AdminItemPage;
