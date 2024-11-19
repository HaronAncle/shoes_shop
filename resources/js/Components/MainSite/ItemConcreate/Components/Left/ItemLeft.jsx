import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import ItemFoto from "./ItemFoto";
import RecomendedFoto from "./RecomendedFoto";

const ItemLeft = ({ data, ...props }) => {
    return (
        <div className="itemarea__left">
            <ItemFoto hreffoto={data.urlimages} />
            <RecomendedFoto id={data.id} />
        </div>
    );
};

export default ItemLeft;
