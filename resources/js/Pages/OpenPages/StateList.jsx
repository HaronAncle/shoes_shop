import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import News from "@/Components/MainSite/News/News";
import Bread from "@/Components/MainSite/Bread/Bread";
import { Head } from "@inertiajs/react";

const StateList = () => {
    const links = [{ href: "states", name: "Статьи" }];

    return (
        <div className="App">
            <Head title="Статьи" />
            <HeaderUser />

            <Bread links={links} />

            <News />

            <FooterUser />
        </div>
    );
};

export default StateList;
