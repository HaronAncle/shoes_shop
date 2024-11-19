import React, { useState, useEffect } from "react";
import axios from "axios";
import BrandFormModal from "../BrandFormModal/BrandFormModal";
import ErrorModal from "@/Components/UIGlobal/ModalError/ModalError";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./BrandManager.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const BrandManager = () => {
    const [brands, setBrands] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingImage, setLoadingImage] = useState({});
    const [imageError, setImageError] = useState({});

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`/api/workpanel/admin/brands`);
            setBrands(response.data);
        } catch (error) {
            console.error(
                "Error fetching brands:",
                JSON.stringify(error, null, 2)
            );
            setErrorMessage("Ошибка при загрузке брендов.");
            setShowErrorModal(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/workpanel/admin/brands/${id}`);
            fetchBrands();
        } catch (error) {
            console.error(
                "Error deleting brand:",
                JSON.stringify(error, null, 2)
            );
            setErrorMessage("Ошибка при удалении бренда.");
            setShowErrorModal(true);
        }
    };

    const handleSave = async (formData) => {
        try {
            if (modalType === "edit") {
                await axios.post(
                    `/api/workpanel/admin/brands/${selectedBrand.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                await axios.post(`/api/workpanel/admin/brands`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            fetchBrands();
            setShowModal(false);
        } catch (error) {
            console.error(
                "Error saving brand:",
                JSON.stringify(error, null, 2)
            );
            console.log("Результат:", error);
            setShowModal(false);
            setErrorMessage("Ошибка при сохранении бренда.");
            setShowErrorModal(true);
        }
    };

    const openModal = (type, brand = null) => {
        setModalType(type);
        setSelectedBrand(brand);
        setShowModal(true);
    };

    const handleImageLoad = (id) => {
        setLoadingImage((prev) => ({ ...prev, [id]: false }));
    };

    const handleImageError = (id) => {
        setLoadingImage((prev) => ({ ...prev, [id]: false }));
        setImageError((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className="brand-manager">
            <button className="btn-add" onClick={() => openModal("add")}>
                + Добавить бренд
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Картинка</th>
                        <th>Заголовок</th>
                        <th>Поисковый заголовок</th>
                        <th>Описание</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr key={brand.id}>
                            <td className="image-cell">
                                {loadingImage[brand.id] ? (
                                    <div className="image-placeholder">
                                        <Loading />
                                    </div>
                                ) : !brand.urlimg_logo ||
                                  imageError[brand.id] ? (
                                    <div className="image-placeholder">
                                        Изображение отсутствует
                                    </div>
                                ) : (
                                    <img
                                        src={brand.urlimg_logo}
                                        alt={brand.title}
                                        onLoad={() => handleImageLoad(brand.id)}
                                        onError={() =>
                                            handleImageError(brand.id)
                                        }
                                    />
                                )}
                            </td>
                            <td>{brand.title}</td>

                            <td>{brand.search_title}</td>
                            <td className="description-cell">
                                {brand.description}
                            </td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => openModal("edit", brand)}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(brand.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <BrandFormModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    type={modalType}
                    brand={selectedBrand}
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

export default BrandManager;
