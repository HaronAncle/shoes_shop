import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import Bread from "@/Components/MainSite/Bread/Bread";
import ItemConcreate from "@/Components/MainSite/ItemConcreate/ItemConcreate";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import axios from "axios";

const ItemPage = () => {
    const { item } = usePage().props;
    const links = [
        { href: "/search", name: "Поиск" },
        { href: "/search/model/", name: "Модель " + item.model },
    ];
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    return (
        <div className="App">
            <Head title={item.title} />
            <HeaderUser />

            <Bread links={links} />

            <ItemConcreate data={item} />

            <FooterUser />
        </div>
    );
};

export default ItemPage;
