import React, { useState, useEffect } from "react";
import axios from "axios";
import PostavkiFormModal from "../PostavkiFormModal/PostavkiFormModal";
import ErrorModal from "@/Components/UIGlobal/ModalError/ModalError";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrash,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PostavkiManager.css";

const PostavkiManager = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingImage, setLoadingImage] = useState({});
    const [imageError, setImageError] = useState({});

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        filterItems();
    }, [searchTerm, items]);

    const fetchItems = async () => {
        try {
            const response = await axios.get("/api/workpanel/admin/postavki");
            setItems(response.data);
            setFilteredItems(response.data);
        } catch (error) {
            console.error(
                "Error fetching items:",
                JSON.stringify(error, null, 2)
            );
            setErrorMessage("Ошибка при загрузке товаров.");
            setShowErrorModal(true);
        }
    };

    const handleSave = async (formData) => {
        try {
            const payload = { counts: formData };

            await axios.put(
                `/api/workpanel/admin/postavki/${selectedItem.id}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            fetchItems();
            setShowModal(false);
        } catch (error) {
            console.error("Error saving item:", JSON.stringify(error, null, 2));
            setShowModal(false);
            setErrorMessage("Ошибка при сохранении товара.");
            setShowErrorModal(true);
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleImageLoad = (id) => {
        setLoadingImage((prev) => ({ ...prev, [id]: false }));
    };

    const handleImageError = (id) => {
        setLoadingImage((prev) => ({ ...prev, [id]: true }));
        setImageError((prev) => ({ ...prev, [id]: true }));
    };

    const joinStrings = (...strings) => {
        if (strings.length < 2) {
            return "";
        }
        const joinedString = strings.slice(0, -1).join(", ");
        return joinedString;
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filterItems = () => {
        setFilteredItems(
            items.filter(
                (item) =>
                    (typeof item.title === "string" &&
                        item.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (typeof item.model === "string" &&
                        item.model
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (typeof item.maincategory === "string" &&
                        item.maincategory
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (typeof item.childcategory === "string" &&
                        item.childcategory
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            )
        );
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPagination = () => {
        const maxPageNumbersToShow = 5;
        const totalPages = pageNumbers.length;
        const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

        let startPage = currentPage - halfPageNumbersToShow;
        let endPage = currentPage + halfPageNumbersToShow;

        if (startPage <= 0) {
            startPage = 1;
            endPage = maxPageNumbersToShow;
        }

        if (endPage > totalPages) {
            startPage = totalPages - maxPageNumbersToShow + 1;
            endPage = totalPages;
        }

        if (totalPages <= maxPageNumbersToShow) {
            startPage = 1;
            endPage = totalPages;
        }

        const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

        return (
            <nav style={{ width: "100%", marginTop: "20px" }}>
                <ul className="pagination justify-content-center">
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="page-link"
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    backgroundColor: "blue",
                                    color: "white",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        </li>
                    )}
                    {visiblePageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${
                                number === currentPage ? "active" : ""
                            }`}
                        >
                            <button
                                onClick={() => paginate(number)}
                                className="page-link"
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    backgroundColor:
                                        number === currentPage
                                            ? "darkblue"
                                            : "blue",
                                    color: "white",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className="page-link"
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    backgroundColor: "blue",
                                    color: "white",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };

    return (
        <div className="item-manager">
            <input
                type="text"
                className="form-control search-input mb-3"
                placeholder="Введите модель или название"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th>Картинка</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Дополнительно</th>
                        <th>Доступно</th>
                        <th>Резерв</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td className="image-cell">
                                {loadingImage[item.id] || !item.urlimages ? (
                                    <div className="image-placeholder">
                                        <Loading />
                                    </div>
                                ) : (
                                    <img
                                        src={item.urlimages}
                                        alt={item.title}
                                        onLoad={() => handleImageLoad(item.id)}
                                        onError={() =>
                                            handleImageError(item.id)
                                        }
                                    />
                                )}
                            </td>
                            <td>{item.title}</td>
                            <td>
                                {joinStrings(
                                    item.maincategory,
                                    item.childcategory,
                                    item.model,
                                    ""
                                )}
                            </td>
                            <td>
                                {joinStrings(
                                    "размеры: " + item.sizes + "",
                                    "цвет: " + item.colors,
                                    "сезон: " + item.season,
                                    ""
                                )}
                            </td>
                            <td>
                                {joinStrings(
                                    "всего: " + item.total_quantity,
                                    item.sizes_with_counts,
                                    ""
                                )}
                            </td>
                            <td>
                                {joinStrings(
                                    "всего: " + item.total_quantity_order,
                                    item.sizes_with_order_counts,
                                    ""
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => openModal("edit", item)}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">{renderPagination()}</div>

            {showModal && (
                <PostavkiFormModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    type={modalType}
                    item={selectedItem}
                />
            )}

            {showErrorModal && (
                <ErrorModal
                    show={showErrorModal}
                    onClose={() => setShowErrorModal(false)}
                    message={errorMessage}
                />
            )}
        </div>
    );
};

export default PostavkiManager;
