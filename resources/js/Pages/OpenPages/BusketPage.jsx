import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import Busket from "@/Components/MainSite/Busket/Busket";
import Bread from "@/Components/MainSite/Bread/Bread";
import { Head } from "@inertiajs/react";

const BusketPage = () => {
    const links = [{ href: "busket", name: "Корзина" }];
    return (
        <div className="App">
            <Head title="Корзина" />
            <HeaderUser />

            <Bread links={links} />
            <Busket />

            <FooterUser />
        </div>
    );
};

export default BusketPage;
