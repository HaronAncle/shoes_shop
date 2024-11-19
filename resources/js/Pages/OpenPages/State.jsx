import React, { useState, useEffect } from "react";
import HeaderUser from "@/Components/Layouts/HeaderUser/HeaderUser";
import FooterUser from "@/Components/Layouts/FooterUser/FooterUser";
import NewConcreate from "@/Components/MainSite/News/NewConcreate/NewConcreate";
import { Head } from "@inertiajs/react";
import Bread from "@/Components/MainSite/Bread/Bread";
import axios from "axios";

const State = () => {
    const [data, setData] = useState({});

    const getIdFromUrl = () => {
        const url = window.location.href;
        const parts = url.split("/");
        const id = parts[parts.length - 1];
        return id;
    };

    useEffect(() => {
        const fetchData = async () => {
            const id = getIdFromUrl();
            try {
                const response = await axios.get(
                    `/api/states/getstatebyid/${id}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const links = [
        { href: "/states", name: "Статьи" },
        { href: "/state/", name: data.title },
    ];
    return (
        <div className="App">
            <Head title={data.title} />
            <HeaderUser />
            <Bread links={links} />
            <NewConcreate data={data} />

            <FooterUser />
        </div>
    );
};

export default State;
