import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StateList.module.css";
// const baseUrl = env.REACT_APP_API_BASE_URL;

function StateListBlock() {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true); // Статус загрузки данных
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Установка статуса загрузки в true перед запросом

                const response = await axios.get("api/states", {
                    params: {
                        title: filter,
                        sort_by: sortBy,
                        sort_order: sortOrder,
                    },
                });

                setStates(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching states:", error);
                setLoading(false);
            }
        };

        fetchData(); // Вызываем асинхронную функцию fetchData()
    }, [filter, sortBy, sortOrder]);

    return (
        <div className={styles.stateList}>
            <input
                type="text"
                placeholder="Filter by title"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={styles.filterInput}
            />
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sortSelect}
            >
                <option value="title">Title</option>
                <option value="created_at">Creation Date</option>
            </select>
            <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={styles.sortSelect}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            {loading ? ( // Отображение индикатора загрузки, пока данные загружаются
                <p>Loading...</p>
            ) : (
                <ul className={styles.list}>
                    {Array.isArray(states) &&
                        states.map((state) => (
                            <li key={state.id} className={styles.listItem}>
                                <h2>{state.title}</h2>
                                <p>{state.statebody}</p>
                                <p>
                                    {new Date(
                                        state.created_at
                                    ).toLocaleString()}
                                </p>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default StateListBlock;
