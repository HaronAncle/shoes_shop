import React, { useEffect, useState } from "react";
import PanelLayout from "@/Components/Panel/PanelLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminPageBlock from "@/Components/Workers/Admin/AdmPage/AdmPageBlock";

const AdminUserPage = () => {
    return (
        <PanelLayout>
            <Head title="Управление аккаунтами" />
            <AdminPageBlock />
        </PanelLayout>
    );
};

export default AdminUserPage;
