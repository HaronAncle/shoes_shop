import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdmPostavkiBlock from "@/Components/Workers/Admin/AdmPostavki/AdmPostavkiBlock";

const AdminPostavkiPage = () => {
    return (
        <PanelLayout>
            <Head title="Управление поставками" />
            <AdmPostavkiBlock />
        </PanelLayout>
    );
};

export default AdminPostavkiPage;
