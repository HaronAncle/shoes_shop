import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialFormModal from "../MaterialFormModal/MaterialFormModal";
import ErrorModal from "@/Components/UIGlobal/ModalError/ModalError";
import "./MaterialManager.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const MaterialsManager = ({ materialType = "materialsIns", ...props }) => {
    const [materials, setMaterials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(
                `/api/workpanel/admin/${materialType}`
            );
            setMaterials(response.data);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/workpanel/admin/${materialType}/${id}`);
            fetchMaterials();
        } catch (error) {
            console.error("Error deleting material:", error);
            setErrorMessage("Ошибка при удалении материала.");
            setShowErrorModal(true);
        }
    };

    const handleSave = async (material) => {
        try {
            if (modalType === "edit") {
                await axios.put(
                    `/api/workpanel/admin/${materialType}/${selectedMaterial.id}`,
                    material
                );
            } else {
                await axios.post(
                    `/api/workpanel/adminуу/${materialType}`,
                    material
                );
            }
            fetchMaterials();
            setShowModal(false);
        } catch (error) {
            setShowModal(false);
            console.error("Error saving material:", error);
            setErrorMessage("Ошибка при сохранении материала.");
            setShowErrorModal(true);
        }
    };

    const openModal = (type, material = null) => {
        setModalType(type);
        setSelectedMaterial(material);
        setShowModal(true);
    };

    return (
        <div className="materials-manager">
            <button className="btn-add" onClick={() => openModal("add")}>
                + Добавить материал
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Заголовок</th>
                        <th>Поисковый заголовок</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material) => (
                        <tr key={material.id}>
                            <td>{material.title}</td>
                            <td>{material.search_title}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => openModal("edit", material)}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                    Редактировать
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(material.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <MaterialFormModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    type={modalType}
                    material={selectedMaterial}
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

export default MaterialsManager;
