import React from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import Bread from "@/Components/MainSite/Bread/Bread";
import SearchBlock from "@/Components/MainSite/Search/SearchBlock";
import { Head } from "@inertiajs/react";

const Search = () => {
    const links = [{ href: "search", name: "Поиск" }];

    return (
        <div className="App">
            <Head title="Поиск" />
            <HeaderUser />

            <Bread links={links} />

            <SearchBlock />

            <FooterUser />
        </div>
    );
};

export default Search;
