import React, { useEffect, useState } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ImageUpload from "@/Components/UIGlobal/ImageUpload/ImageUpload";
import "./../Admin.css";

const AdminPageBlock = ({ children, ...props }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="panelbody">
            <div className="panelblock">
                <div className="panelblock__title">Заказы</div>
                <div className="panelblock__body">
                    <div className="panelblock__instrumemts">
                        <div>
                            <button onClick={openModal}>
                                Открыть модальное окно
                            </button>
                            <Modal
                                show={isModalOpen}
                                onClose={closeModal}
                                maxWidth="3xl"
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-4">
                                        Создание новой карточки
                                    </h2>
                                    <form
                                        action="
                                        "
                                    >
                                        <div>
                                            <InputLabel
                                                htmlFor="title"
                                                value="Название"
                                            />

                                            <TextInput
                                                id="title"
                                                type="text"
                                                name="title"
                                                // value={data.email}
                                                className="mt-1 block w-full"
                                                // autoComplete="username"
                                                placeholder="Название"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="model"
                                                value="Модель"
                                            />

                                            <TextInput
                                                id="model"
                                                type="text"
                                                name="model"
                                                // value={data.email}
                                                className="mt-1 block w-full"
                                                // autoComplete="username"
                                                placeholder="Модель"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "model",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.model}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>Для кого</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>Тип обуви</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row justify-content-center mt-4">
                                            <div className="col-md-12">
                                                <div
                                                    className="upload-block"
                                                    id="uploadBlock"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "fileInput"
                                                            )
                                                            .click()
                                                    }
                                                >
                                                    {!image && (
                                                        <span className="upload-text">
                                                            Загрузите
                                                            изображение
                                                        </span>
                                                    )}
                                                    {image && (
                                                        <img
                                                            id="previewImage"
                                                            src={image}
                                                            alt="Your Image"
                                                        />
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="fileInput"
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>
                                                        Материал верха
                                                    </option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>
                                                        Материал подкладки
                                                    </option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>
                                                        Материал подошвы
                                                    </option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>Цвет</option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <select
                                                    className="selectpicker form-control"
                                                    data-live-search="true"
                                                >
                                                    <option>
                                                        Тип застежки
                                                    </option>
                                                    <option>Option 2</option>
                                                    <option>Option 3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={closeModal}
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </Modal>
                        </div>
                    </div>

                    <table className="panelblock__table">
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Название</th>
                                <th>Категория</th>
                                <th>Размеры</th>
                                <th>Стоимость</th>
                                <th>Управление</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Фото</th>
                                <th>Название</th>
                                <th>Категория</th>
                                <th>Размеры</th>
                                <th>Стоимость</th>
                                <th>Управление</th>
                            </tr>
                            {/* {products.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={product.photo}
                                                    alt={product.name}
                                                />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.sizes.join(", ")}</td>
                                            <td>{product.price}</td>
                                            <td>Управление элементом</td>
                                        </tr>
                                    ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panelblock">
                <ImageUpload />
            </div>
        </div>
    );
};

export default AdminPageBlock;
