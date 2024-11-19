import React from "react";

import Banners from "./Components/Banners/Banners";
import Brend from "./Components/Brend/Brend";
import ItemLine from "./Components/ItemLine/ItemLine";
import LikeProduct from "./Components/LikeProduct/LikeProduct";

import "./MainPage.css";

const MainPage = () => {
    return (
        <main className="main">
            <Banners />
            <Brend />
            <ItemLine hrefFor="womens" hrefName="Женщинам" />
            <ItemLine hrefFor="mens" hrefName="Мужчинам" />
            <ItemLine hrefFor="boys" hrefName="Мальчикам" />
            <ItemLine hrefFor="girls" hrefName="Девочкам" />
            {/* <LikeProduct /> */}
        </main>
    );
};

export default MainPage;
