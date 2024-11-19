import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemInSearch from "@/Components/UIGlobal/ItemInSearch/ItemInSearch";
import ViewForCount from "./ViewForCount";
import SortType from "./SortType";
import Pagination from "./Pagination";
import { data } from "jquery";
import Loading from "@/Components/UIGlobal/Loading/Loading";

const SearchRight = () => {
    const [data1, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const filters = {};

        filters.sorttype = queryParams.get("sorttype") || "popularity";
        filters.page = queryParams.get("page") || "1";
        filters.viewforcount = queryParams.get("viewforcount") || "24";
        filters.other = {};

        queryParams.forEach((value, key) => {
            if (
                key !== "sorttype" &&
                key !== "page" &&
                key !== "viewforcount"
            ) {
                const key1 = key.replace(/\[.*?\]/g, "");
                filters.other[key1] = value.split(",");
            }
        });

        const fetchData = async () => {
            console.log(filters);
            try {
                console.log(filters);
                const response = await axios.get("api/search/getitems", {
                    params: {
                        filters: filters,
                    },
                });
                if (response.status !== 200) {
                    throw new Error("Failed to fetch data");
                }
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="searcharea__right">
            <div className="searcharea__sortblock">
                <SortType />
                <ViewForCount />
            </div>
            {loading ? (
                <Loading size="lg" />
            ) : (
                <>
                    {data1?.items?.length ? (
                        <div className="searcharea__itemsarea">
                            {data1.items.map((item, index) => (
                                <ItemInSearch
                                    key={index}
                                    data={item}
                                    typenum={2}
                                    hrefFor={"search"}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="searcharea__no-items">
                            Ничего не найдено
                        </div>
                    )}
                    <Pagination totalPages={data1.last_page} />
                </>
            )}
        </div>
    );
};

export default SearchRight;
