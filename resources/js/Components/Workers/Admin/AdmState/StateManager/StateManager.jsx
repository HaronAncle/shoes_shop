import React, { useState, useEffect } from "react";
import axios from "axios";
import StateFormModal from "../StateFormModal/StateFormModal";
import ErrorModal from "@/Components/UIGlobal/ModalError/ModalError";
import Loading from "@/Components/UIGlobal/Loading/Loading";
import "./StateManager.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const StateManager = () => {
    const [states, setStates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingImage, setLoadingImage] = useState({});
    const [imageError, setImageError] = useState({});

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get(`/api/workpanel/admin/states`);
            setStates(response.data);
        } catch (error) {
            console.error(
                "Error fetching States:",
                JSON.stringify(error, null, 2)
            );
            setErrorMessage("Ошибка при загрузке статей.");
            setShowErrorModal(true);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/workpanel/admin/states/${id}`);
            fetchStates();
        } catch (error) {
            console.error(
                "Error deleting state:",
                JSON.stringify(error, null, 2)
            );
            setErrorMessage("Ошибка при удалении статьи.");
            setShowErrorModal(true);
        }
    };

    const handleSave = async (formData) => {
        try {
            if (modalType === "edit") {
                await axios.post(
                    `/api/workpanel/admin/states/${selectedState.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                await axios.post(`/api/workpanel/admin/states`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            fetchStates();
            setShowModal(false);
        } catch (error) {
            console.error(
                "Error saving State:",
                JSON.stringify(error, null, 2)
            );
            console.log("Результат:", error);
            setShowModal(false);
            setErrorMessage("Ошибка при сохранении статьи.");
            setShowErrorModal(true);
        }
    };

    const openModal = (type, state = null) => {
        setModalType(type);
        setSelectedState(state);
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
        <div className="state-manager">
            <button className="btn-add" onClick={() => openModal("add")}>
                + Добавить статью
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Картинка</th>
                        <th>Заголовок</th>
                        <th>Дата</th>
                        <th>Прочтений</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {states.map((state) => (
                        <tr key={state.id}>
                            <td className="image-cell">
                                {loadingImage[state.id] ? (
                                    <div className="image-placeholder">
                                        <Loading />
                                    </div>
                                ) : !state.foto_url || imageError[state.id] ? (
                                    <div className="image-placeholder">
                                        Изображение отсутствует
                                    </div>
                                ) : (
                                    <img
                                        src={state.foto_url}
                                        alt={state.title}
                                        onLoad={() => handleImageLoad(state.id)}
                                        onError={() =>
                                            handleImageError(state.id)
                                        }
                                    />
                                )}
                            </td>
                            <td>{state.title}</td>
                            <td>{state.created_at}</td>
                            <td>{state.views}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => openModal("edit", state)}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(state.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <StateFormModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    type={modalType}
                    state={selectedState}
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

export default StateManager;
