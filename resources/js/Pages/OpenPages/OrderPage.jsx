import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import Bread from "@/Components/MainSite/Bread/Bread";
import Order from "@/Components/MainSite/Order/Order";
import { Head } from "@inertiajs/react";

const OrderPage = () => {
    const links = [
        { href: "busket", name: "Корзина" },
        { href: "order", name: "Страница заказа" },
    ];

    return (
        <div className="App">
            <Head title="Страница заказа" />
            <HeaderUser />

            <Bread links={links} />

            <Order />

            <FooterUser />
        </div>
    );
};

export default OrderPage;
