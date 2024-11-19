import React, { useState, useEffect } from "react";
import Modal from "@/Components/UIGlobal/Modal/Modal";
import axios from "axios";
import Checkbox from "@/Components/UIGlobal/Checkbox/Checkbox";
import "./ItemFormModal.css";

const ItemFormModal = ({ show, onClose, onSave, type, item }) => {
    const [formData, setFormData] = useState({
        title: "",
        model: "",
        category: "",
        subcategory: "",
        brand: "",
        season: "default",
        price: "",
        quantity: 0,
        image: null,
        imagePreview: null,
        imageChanged: false,
        imageRequired: type === "add",
        materialSole: "default",
        heelType: "default",
        characteristics: {
            size: [],
            color: [],
            materialOutside: [],
            materialInside: [],
            claspType: [],
        },
    });

    const [options, setOptions] = useState({
        categories: [],
        subcategories: [],
        seasons: [],
        materials: {
            outside: [],
            inside: [],
            sole: [],
        },
        sizes: [],
        colors: [],
        claspTypes: [],
        brands: [],
        heelTypes: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchOptions();
        if (type === "edit" && item) {
            setFormData({
                title: item.title || "",
                model: item.model || "",
                category: item.maincategory_id || "default",
                subcategory: item.childcategory_id || "default",
                brand: item.brand_id || "default",
                season: item.season_id || "default",
                price: item.price || "",
                quantity: item.total_quantity,
                image: null,
                imagePreview: item.urlimages,
                imageChanged: false,
                imageRequired: false,
                materialSole: item.material_sole_id || "default",
                heelType: item.heelType || "default",

                characteristics: {
                    size: item.sizes_id ? item.sizes_id.split(",") : [],
                    color: item.colors_id ? item.colors_id.split(",") : [],
                    claspType: item.clasptype_id
                        ? item.clasptype_id.split(",")
                        : [],
                    materialOutside: item.material_outside_id
                        ? item.material_outside_id.split(",")
                        : [],
                    materialInside: item.material_inside_id
                        ? item.material_inside_id.split(",")
                        : [],
                },
            });
        }
    }, [type, item]);

    const fetchOptions = async () => {
        try {
            const response = await axios.get("/api/workpanel/admin/items/info");
            const data = response.data;

            const categories = data.find(
                (opt) => opt.namex === "maincategories"
            ).options;
            const subcategories = data.find(
                (opt) => opt.namex === "childcategories"
            ).options;
            const seasons = data.find((opt) => opt.namex === "seasons").options;
            const brands = data.find((opt) => opt.namex === "brends").options;
            const materials = {
                outside: data.find((opt) => opt.namex === "material_outsides")
                    .options,
                inside: data.find((opt) => opt.namex === "material_insides")
                    .options,
                sole: data.find((opt) => opt.namex === "material_soles")
                    .options,
            };
            const claspTypes = data.find(
                (opt) => opt.namex === "clasp_types"
            ).options;
            const sizes = data.find((opt) => opt.namex === "sizes").options;
            const colors = data.find((opt) => opt.namex === "colors").options;
            const heelTypes = data.find(
                (opt) => opt.namex === "heepiece_types"
            ).options;

            setOptions({
                categories,
                subcategories,
                seasons,
                brands,
                materials,
                sizes,
                colors,
                claspTypes,
                heelTypes,
            });
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Название обязательно.";
        if (!formData.model) newErrors.model = "Модель обязательна.";
        if (
            !formData.price ||
            parseFloat(formData.price) <= 0 ||
            parseFloat(formData.price) > 10000
        ) {
            newErrors.price = "Укажите корректную цену до 10000.";
        }
        if (!/^\d+(\.|,)?\d{0,2}$/.test(formData.price)) {
            newErrors.price =
                "Цена может содержать только до двух десятичных знаков.";
        }
        if (!formData.category || formData.category === "default")
            newErrors.category = "Выберите категорию.";
        if (!formData.subcategory || formData.subcategory === "default")
            newErrors.subcategory = "Выберите подкатегорию.";
        if (!formData.brand || formData.brand === "default")
            newErrors.brand = "Выберите бренд.";
        if (!formData.season || formData.season === "default")
            newErrors.season = "Выберите сезон.";
        if (!formData.materialSole || formData.materialSole === "default")
            newErrors.materialSole = "Выберите материал для подошвы.";
        if (!formData.heelType || formData.heelType === "default")
            newErrors.heelType = "Выберите тип застежки.";

        if (formData.imageRequired && !formData.image) {
            newErrors.image = "Изображение обязательно.";
        }

        if (formData.characteristics.size.length === 0)
            newErrors.size = "Выберите хотя бы один размер.";

        if (formData.characteristics.claspType.length === 0)
            newErrors.claspType = "Выберите хотя бы один цвет.";
        if (formData.characteristics.color.length === 0)
            newErrors.color = "Выберите хотя бы один цвет.";
        if (formData.characteristics.materialOutside.length === 0)
            newErrors.materialOutside =
                "Выберите хотя бы один материал для верха.";
        if (formData.characteristics.materialInside.length === 0)
            newErrors.materialInside =
                "Выберите хотя бы один материал для подкладки.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData1 = new FormData();
            formData1.append("title", formData.title);
            formData1.append("model", formData.model);
            formData1.append("category", formData.category);
            formData1.append("subcategory", formData.subcategory);
            formData1.append("brand", formData.brand);
            formData1.append("season", formData.season);
            console.log(formData.price.toString().replace(",", "."));
            formData1.append(
                "price",
                parseFloat(formData.price.toString().replace(",", "."))
            );
            formData1.append("quantity", formData.quantity);
            formData1.append("imageChanged", formData.imageChanged);
            formData1.append("materialSole", formData.materialSole);
            formData1.append("heelType", formData.heelType);
            formData1.append("characteristics", formData.characteristics);

            if (formData.imageChanged && formData.image) {
                formData1.append("image", formData.image);
            }

            onSave(formData);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
                imagePreview: URL.createObjectURL(file),
                imageChanged: true,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                image: null,
                imagePreview: null,
                imageChanged: false,
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const formattedValue = value
            .replace(/[^0-9.,]/g, "")
            .replace(/,/, ".")
            .replace(/^(\d*\.\d{0,2}).*$/, "$1");
        setFormData((prevData) => ({
            ...prevData,
            price: formattedValue,
        }));
    };

    const handleCheckboxChange = (e, key) => {
        const { value, checked } = e.target;

        setFormData((prevData) => {
            const { characteristics } = prevData;

            const currentValues = characteristics[key] || [];
            const newValues = checked
                ? [...currentValues, value]
                : currentValues.filter((val) => val !== value);

            return {
                ...prevData,
                characteristics: {
                    ...characteristics,
                    [key]: newValues,
                },
            };
        });
    };

    const renderSelectOptions = (name, options) => (
        <select name={name} value={formData[name]} onChange={handleInputChange}>
            <option value="default">Выберите значение</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.title}
                </option>
            ))}
        </select>
    );

    const renderCheckboxOptions = (name, options) => (
        <div className="checkbox-group">
            {options.map((option) => (
                <label key={option.id} className="checkbox-label">
                    <Checkbox
                        value={option.id}
                        name={name}
                        checked={formData.characteristics[name].includes(
                            option.id.toString()
                        )}
                        onChange={(e) => handleCheckboxChange(e, name)}
                    />
                    {option.title}
                </label>
            ))}
            {errors[name] && <div className="field-error">{errors[name]}</div>}
        </div>
    );

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit}>
                <div className="modal-block">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {type === "edit"
                                ? "Редактировать товар"
                                : "Добавить товар"}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={onClose}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {errors.submit && (
                            <div className="form-error">{errors.submit}</div>
                        )}
                        <div className="form-group">
                            <label>Название</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            {errors.title && (
                                <div className="field-error">
                                    {errors.title}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Модель</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                            />
                            {errors.model && (
                                <div className="field-error">
                                    {errors.model}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Изображение</label>
                            <label className="image-upload">
                                {formData.imagePreview ? (
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className="image-preview"
                                    />
                                ) : (
                                    <div className="image-placeholder">
                                        Вставьте изображение
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                            {errors.image && (
                                <div className="field-error">
                                    {errors.image}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Категория</label>
                            {renderSelectOptions(
                                "category",
                                options.categories
                            )}
                            {errors.category && (
                                <div className="field-error">
                                    {errors.category}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Подкатегория</label>
                            {renderSelectOptions(
                                "subcategory",
                                options.subcategories
                            )}
                            {errors.subcategory && (
                                <div className="field-error">
                                    {errors.subcategory}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Бренд</label>
                            {renderSelectOptions("brand", options.brands)}
                            {errors.brand && (
                                <div className="field-error">
                                    {errors.brand}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Сезон</label>
                            {renderSelectOptions("season", options.seasons)}
                            {errors.season && (
                                <div className="field-error">
                                    {errors.season}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Цена</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handlePriceChange}
                            />
                            {errors.price && (
                                <div className="field-error">
                                    {errors.price}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Тип каблука</label>
                            {renderSelectOptions("heelType", options.heelTypes)}
                            {errors.heelType && (
                                <div className="field-error">
                                    {errors.heelType}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Материалы подошвы</label>
                            {renderSelectOptions(
                                "materialSole",
                                options.materials.sole
                            )}
                            {errors.materialSole && (
                                <div className="field-error">
                                    {errors.materialSole}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Материалы верха</label>
                            {renderCheckboxOptions(
                                "materialOutside",
                                options.materials.outside
                            )}
                        </div>
                        <div className="form-group">
                            <label>Материалы подкладки</label>
                            {renderCheckboxOptions(
                                "materialInside",
                                options.materials.inside
                            )}
                        </div>

                        <div className="form-group">
                            <label>Цвета</label>
                            {renderCheckboxOptions("color", options.colors)}
                        </div>
                        <div className="form-group">
                            <label>Застежки</label>
                            {renderCheckboxOptions(
                                "claspType",
                                options.claspTypes
                            )}
                        </div>
                        <div className="form-group">
                            <label>Размеры</label>
                            {renderCheckboxOptions("size", options.sizes)}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {type === "edit" ? "Сохранить" : "Добавить"}
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ItemFormModal;
