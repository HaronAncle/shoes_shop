import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmMaterialsBlock from "@/Components/Workers/Admin/AdmMaterials/AdmMaterialsBlock";

const AdminMaterialsPage = () => {
    return (
        <PanelLayout>
            <Head title="Управление материалами" />
            <AdmMaterialsBlock />
        </PanelLayout>
    );
};

export default AdminMaterialsPage;
