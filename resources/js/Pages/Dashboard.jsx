import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import DashboardBlock from "@/Components/Dashboard/DashboardBlock";

export default function Dashboard({ auth }) {
    return (
        <div>
            <Head title="Страница пользователя" />
            <HeaderUser />
            <AuthenticatedLayout user={auth.user}>
                <DashboardBlock />
            </AuthenticatedLayout>
            <FooterUser />
        </div>
    );
}
