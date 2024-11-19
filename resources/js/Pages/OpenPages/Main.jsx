import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import MainPage from "@/Components/MainSite/MainPage/MainPage";
import { Head } from "@inertiajs/react";

const Main = () => {
    return (
        <div className="App">
            <Head title="Главная" />
            <HeaderUser />

            <MainPage />

            <FooterUser />
        </div>
    );
};

export default Main;
