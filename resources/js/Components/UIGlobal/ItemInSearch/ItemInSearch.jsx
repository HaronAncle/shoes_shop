import React, { useState } from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import styles from "./ItemInSearch.module.css";
import Starblock from "../Starblock/Starblock";
import Loading from "../Loading/Loading";

const ItemInSearch = ({ data, typenum, hrefFor }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const itemCardClass = typenum === 1 ? styles.itemcard1 : styles.itemcard2;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <InertiaLink
            className={`${styles.categoryline__item} ${itemCardClass}`}
            href={`/${hrefFor}/model/${data.id}`}
        >
            <div className={styles.itemcard__up}>
                <div className={styles.itemcard__actionblock}>
                    <div className={styles["empty-div"]}></div>
                    {data.action_photo_url && (
                        <div className={styles.itemcard__actiontype}>
                            {data.action_photo_url}
                        </div>
                    )}
                    {data.discount_percent !== "0" && (
                        <div className={styles.itemcard__actionpercent}>
                            {data.discount_percent}
                        </div>
                    )}
                </div>
                <Starblock mark={data.mark} />
            </div>
            <div className={styles.itemcard__infoblock}>
                <div className={styles.itemcard__foto}>
                    {!imageLoaded && <Loading size="md" />}{" "}
                    <img
                        src={data.urlimages}
                        alt=""
                        onLoad={handleImageLoad}
                        style={{ display: imageLoaded ? "block" : "none" }}
                    />
                </div>
                <div className={styles.itemcard__opendescription}>
                    <div className={styles.itemcard__modelinfo}>
                        Модель {data.model}
                    </div>
                    <div className={styles.itemcard__sizelist}>
                        Размеры: {data.sizes}
                    </div>
                    <div className={styles.itemcard__subcategory}>
                        {data.category}
                    </div>
                </div>
                <div className={styles.itemcard__shadowdescription}>
                    <div className={styles.itemcard__shadowline}>
                        <div className={styles.itemcard__shadowlinemain}>
                            Вверх
                        </div>
                        <div className={styles.itemcard__shadowlineadd}>
                            {data.material_outside}
                        </div>
                    </div>
                    <div className={styles.itemcard__shadowline}>
                        <div className={styles.itemcard__shadowlinemain}>
                            Подкладка
                        </div>
                        <div className={styles.itemcard__shadowlineadd}>
                            {data.material_inside}
                        </div>
                    </div>
                    <div className={styles.itemcard__shadowline}>
                        <div className={styles.itemcard__shadowlinemain}>
                            Подошва
                        </div>
                        <div className={styles.itemcard__shadowlineadd}>
                            {data.material_sole}
                        </div>
                    </div>
                </div>
                <div className={styles.itemcard__priceblock}>
                    <span className={styles.itemcard__actualprice}>
                        {data.actual_price.toFixed(2)}
                    </span>{" "}
                    /{" "}
                    <span className={styles.itemcard__oldprice}>
                        {data.normal_price.toFixed(2)}
                    </span>{" "}
                    бел.руб
                </div>
            </div>
        </InertiaLink>
    );
};

export default ItemInSearch;
